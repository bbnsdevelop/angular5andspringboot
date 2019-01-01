package com.helpdeskservice.repositories;

import java.awt.print.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.helpdeskservice.entities.Tikect;

public interface TicketRepository extends MongoRepository<Tikect, String>{
	
	Page<Tikect> findByUserIdOderByDateDesc(Pageable pages,String id);
	
	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusIgnoreCaseContainingAndPriorityIgnoreCaseContainingOderByDateDesc(
			String title, String status, String priority, Pageable pages);

	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusIgnoreCaseContainingAndPriorityIgnoreCaseContainingAndUserIdOderByDateDesc(
			String title, String status, String priority, Pageable pages);
	
	Page<Tikect> findByTitleIgnoreCaseContainingAndStatusIgnoreCaseContainingAndPriorityIgnoreCaseContainingAndAssignedUserOderByDateDesc(
			String title, String status, String priority, Pageable pages);
	
	Page<Tikect> findByNumber(Integer number, Pageable pages);
}
