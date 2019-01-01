package com.helpdeskservice.service;

import org.springframework.data.domain.Page;

import com.helpdeskservice.entities.User;

public interface UserService {
	
	User findByEmail(String email);
	
	User createdOrUpdate(User user);
	
	User findById(String id);
	
	void delete(String id);
	
	Page<User> findAll(int page, int count);

}
