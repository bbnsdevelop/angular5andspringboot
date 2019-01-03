package com.helpdeskservice.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.helpdeskservice.entities.ChangesStatus;
import com.helpdeskservice.entities.Ticket;

@Component
public interface TicketService {
		
	Ticket createOrUpdate(Ticket ticket);
	
	Ticket findById(String id);
	
	void delete(String id);
	
	Page<Ticket> listTicket(int page, int count);
	
	ChangesStatus createChangeStatus(ChangesStatus changesStatus);
	
	Iterable<ChangesStatus> listChangeStatus(String ticketId);
	
	Page<Ticket> findByCurrentUser(int page, int count, String userId);
	
	Page<Ticket> findByParameters(int page, int count, String title, String status, String priority);
	
	Page<Ticket> findByParametersCurrentUser(int page, int count, String title, String status, String priority, String userId);
	
	Page<Ticket> findByNumber(int page, int count, Integer number);
	
	Iterable<Ticket> findAll();
	
	Page<Ticket> findByParameterAndAssignedUser(int page, int count, String title, String status, String priority, String assignedUser);
	 
}
