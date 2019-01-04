package com.helpdeskservice.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.helpdeskservice.entities.ChangesStatus;

@Repository
public interface ChangesStatusRepository extends MongoRepository<ChangesStatus, String>{
	
	Iterable<ChangesStatus> findByTicketIdOrderByDateChangeStatusDesc(String ticketId);

}
