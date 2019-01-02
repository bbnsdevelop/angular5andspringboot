package com.helpdeskservice.repositories;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.helpdeskservice.entities.Tikect;

public interface TicketRepository extends MongoRepository<Tikect, String>{
	
	Page<Tikect> findByUserIdOderByDateDesc(Pageable pages,String id);
	
	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusAndPriorityOderByDateDesc(
			String title, String status, String priority, Pageable pages);

	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusAndPriorityAndUserIdOderByDateDesc(
			String title, String status, String priority, Pageable pages);
	
	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusAndPriorityAndAssignedUserOderByDateDesc(
			String title, String status, String priority, Pageable pages);
	
	Page<Tikect> findByNumber(Integer number, Pageable pages);
}
