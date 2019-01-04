package com.helpdeskservice.utils;

import java.util.Date;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.helpdeskservice.entities.User;
import com.helpdeskservice.security.jwt.JwtTokenUtil;
import com.helpdeskservice.service.UserService;

@Component
public class Utils {
	
	@Autowired
	private UserService service;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	
	public User userFromRequest(HttpServletRequest request) {
		String token = request.getHeader("Authorization");
		String email = this.jwtTokenUtil.getUserNameFronToken(token);
		return this.service.findByEmail(email);
	}
	
	public Date getDateCurrente() {
		return new Date();
	}
	
	public Integer generateNumber() {
		Random randon = new Random();
		return randon.nextInt(9999);
	}
	
	

}
