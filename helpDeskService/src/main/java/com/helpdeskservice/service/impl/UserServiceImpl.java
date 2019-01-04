package com.helpdeskservice.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.helpdeskservice.entities.User;
import com.helpdeskservice.repositories.UserRepository;
import com.helpdeskservice.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User findByEmail(String email) {
		return this.userRepository.findByEmail(email);
	}

	@Override
	public User createdOrUpdate(User user) {
		
		return this.userRepository.save(user);
	}

	@Override
	public User findById(String id) {

		return this.userRepository.findOne(id);
	}

	@Override
	public void delete(String id) {
		this.userRepository.delete(id);		
	}

	@Override
	public Page<User> findAll(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return this.userRepository.findAll(pages);
	}

}
