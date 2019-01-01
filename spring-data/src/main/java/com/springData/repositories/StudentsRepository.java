package com.springData.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.springData.entities.Students;

public interface StudentsRepository extends MongoRepository<Students, String>{

	public List<Students> findByNameLikeIgnoreCase(String name);
}
