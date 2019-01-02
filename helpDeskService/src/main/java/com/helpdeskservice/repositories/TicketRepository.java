package com.helpdeskservice.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.helpdeskservice.entities.Tikect;

public interface TicketRepository extends MongoRepository<Tikect, String>{
	
	Page<Tikect> findByUserIdOrderByDateDesc(Pageable pages,String id);
	
	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusAndPriorityOrderByDateDesc(
			String title, String status, String priority, Pageable pages);

	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusAndPriorityAndUserIdOrderByDateDesc(
			String title, String status, String priority, Pageable pages);
	
	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusAndPriorityAndAssignedUserOrderByDateDesc(
			String title, String status, String priority, Pageable pages);
	
	Page<Tikect> findByNumber(Integer number, Pageable pages);
}
