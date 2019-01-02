package com.helpdeskservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.helpdeskservice.entities.ChangesStatus;

public interface ChangesStatusRepository extends MongoRepository<ChangesStatus, String>{
	
	Iterable<ChangesStatus> findByTikectIdOrderByDateChangeStatusDesc(String ticketId);

}
