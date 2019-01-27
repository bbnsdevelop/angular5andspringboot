package com.helpdeskservice.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.helpdeskservice.entities.Ticket;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String>{
	
	Page<Ticket> findByUserIdOrderByDateDesc(Pageable pages, String userId);
	
	Page<Ticket> findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingOrderByDateDesc(
			String title, String status, String priority, Pageable pages);

	Page<Ticket> findByTitleContainingIgnoreCaseAndStatusContainingAndPriorityContainingAndUserIdOrderByDateDesc(
			String title, String status, String priority, String userId, Pageable pages);
	
	Page<Ticket> findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingAndAssignedUserOrderByDateDesc(
			String title, String status, String priority, String assignedUser, Pageable pages);
	
	Page<Ticket> findByNumber(Integer number, Pageable pages);
}
