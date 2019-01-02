package com.helpdeskservice.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.helpdeskservice.entities.User;

public interface UserRepository extends MongoRepository<User, String>{
	
	User findByEmail(String email);

	Page<User> findAll(Pageable pages);

}
