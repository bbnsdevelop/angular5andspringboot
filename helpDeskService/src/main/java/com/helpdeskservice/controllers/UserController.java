package com.helpdeskservice.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpdeskservice.entities.User;
import com.helpdeskservice.response.Response;
import com.helpdeskservice.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@PostMapping("/user")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<User>> create(HttpServletRequest request, 
			@RequestBody User user, BindingResult result) {
		Response<User> response = new Response<User>();
		try {
			validateCreateUser(user, result);
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			user.setPassword(this.passwordEncoder.encode(user.getPassword()));
			response.setData(this.userService.createdOrUpdate(user));
			
		} catch (DuplicateKeyException de) {
			response.getErros().add("Email already registered !");
			return ResponseEntity.badRequest().body(response);
		}
		catch (Exception ee) {
			response.getErros().add(ee.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/user")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<User>> update(HttpServletRequest request, 
			@RequestBody User user, BindingResult result){
		Response<User> response = new Response<User>();
		try {
			validateUpdateUser(user, result);
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			user.setPassword(this.passwordEncoder.encode(user.getPassword()));
			response.setData(this.userService.createdOrUpdate(user));
			
		} catch (Exception ee) {
			response.getErros().add(ee.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		
		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/user/{page}/{count}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<Page<User>>> findAll(@PathVariable("page") int page, @PathVariable("count") int count){
		Response<Page<User>> response = new Response<Page<User>>(); 
		response.setData(this.userService.findAll(page, count));		
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/user/{id}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<User>> findById(@PathVariable("id") String id){
		Response<User> response = new Response<User>();
		User user = this.userService.findById(id);
		if(user == null) {
			response.getErros().add("Register not found id: " + id);
			return ResponseEntity.badRequest().body(response);
		}
		response.setData(user);		
		return ResponseEntity.ok(response);
	}
	
	@DeleteMapping("/user/{id}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") String id){
		Response<String> response = new Response<String>();
		User user = this.userService.findById(id);
		if(user == null) {
			response.getErros().add("Register not found id: " + id);
			return ResponseEntity.badRequest().body(response);
		}
		this.userService.delete(id);				
		return ResponseEntity.ok(response);
	}
	
	private void validateCreateUser(User user, BindingResult result) {
		if(user.getEmail() == null) {
			result.addError(new ObjectError("User", "Email no information"));
		}
	}
	private void validateUpdateUser(User user, BindingResult result) {
		if(user.getId() == null) {
			result.addError(new ObjectError("User", "Id no information"));
		}
		if(user.getEmail() == null) {
			result.addError(new ObjectError("User", "Email no information"));
		}
	}
}
