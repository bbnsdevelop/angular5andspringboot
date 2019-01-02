package com.helpdeskservice.security.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpdeskservice.entities.User;
import com.helpdeskservice.security.jwt.JwtAuthenticationRequest;
import com.helpdeskservice.security.jwt.JwtTokenUtil;
import com.helpdeskservice.security.model.CurrentUser;
import com.helpdeskservice.service.UserService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class AuthenticationRestController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private UserService userService;
	
	@PostMapping("/auth")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException{
		
		final Authentication authentication = this.authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(				
						authenticationRequest.getEmail(), authenticationRequest.getPassword()
						)
			);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		final UserDetails userDetails = this.userDetailsService.loadUserByUsername(authenticationRequest.getEmail());
		final String token = this.jwtTokenUtil.generateToken(userDetails);
		final User user = this.userService.findByEmail(authenticationRequest.getEmail());
		user.setPassword(null);
		return ResponseEntity.ok(new CurrentUser(token, user));
		
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request){
		String token = request.getHeader("Authorization");
		String username = this.jwtTokenUtil.refreshedToken(token);
		final User user = this.userService.findByEmail(username);
		
		if(this.jwtTokenUtil.canTokenBeRefreshed(token)) {
			String refreshToken = this.jwtTokenUtil.refreshedToken(token);
			return ResponseEntity.ok(new CurrentUser(refreshToken, user));
		}else {
			return ResponseEntity.badRequest().body(null);
		}
			
	}
	
}
