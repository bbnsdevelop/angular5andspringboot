package com.helpdeskservice.service.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.helpdeskservice.entities.ChangesStatus;
import com.helpdeskservice.entities.Ticket;
import com.helpdeskservice.entities.User;
import com.helpdeskservice.entities.enumerators.Status;
import com.helpdeskservice.repositories.ChangesStatusRepository;
import com.helpdeskservice.repositories.TicketRepository;
import com.helpdeskservice.service.TicketService;
import com.helpdeskservice.utils.Utils;

@Service
public class TicketServiceImpl implements TicketService {

	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private ChangesStatusRepository changesStatusRepository;

	@Autowired
	private Utils util;

	@Override
	public Ticket createOrUpdate(Ticket ticket, HttpServletRequest request) {
		creatadeOrUpdadteTicket(ticket, request);
		return this.ticketRepository.save(ticket);
	}
	
	@Override
	public Ticket createOrUpdateTicketWithIdAndStatus(Ticket ticket, String id, String status,
			HttpServletRequest request) {
		Ticket ticketFind= null;
		try {
			ticketFind = this.ticketRepository.findOne(id);
			if(ticketFind != null) {
				ticket = ticketFind; 
				ticket.setStatus(Status.getStatus(status));
				if(status.equalsIgnoreCase("ASSIGNED")) {
					ticket.setAssignedUser(this.util.userFromRequest(request));
				}
				ticketFind = this.ticketRepository.save(ticket);
				saveChangeStatusWithTiket(ticketFind, ticket.getAssignedUser());
			}else {
				throw new Exception("Register not found id:" + id);
			}			
		} catch (Exception e) {
		}
		
		return ticketFind;
	}

	private void saveChangeStatusWithTiket(Ticket ticketFind, User user) {
		ChangesStatus changesStatus = new ChangesStatus();
		changesStatus.setUserChange(user);
		changesStatus.setDateChangeStatus(this.util.getDateCurrente());
		changesStatus.setStatus(ticketFind.getStatus());
		changesStatus.setTicket(ticketFind);
		this.createChangeStatus(changesStatus);	
		
	}

	@Override
	public Ticket findById(String id) {
		Ticket ticket = this.ticketRepository.findOne(id);
		if (ticket.getId() != null) {
			ticket.getUser().setPassword(null);
			ticket.setChanges(findChanges(ticket.getId()));
		}
		return ticket;
	}

	@Override
	public void delete(String id) {
		try {
			Ticket ticket = this.ticketRepository.findOne(id);
			if (ticket == null) {
				throw new Exception("Register not found id:" + id);
			} else {
				this.ticketRepository.delete(id);
			}
		} 
		catch (Exception e) {
		
		}
	}

	@Override
	public Page<Ticket> listTicket(int page, int count) {
		Pageable pages = new PageRequest(page, count);
		return this.ticketRepository.findAll(pages);
	}

	@Override
	public ChangesStatus createChangeStatus(ChangesStatus changesStatus) {
		return this.changesStatusRepository.save(changesStatus);
	}

	@Override
	public Iterable<ChangesStatus> listChangeStatus(String ticketId) {
		return this.changesStatusRepository.findByTicketIdOrderByDateChangeStatusDesc(ticketId);
	}

	@Override
	public Page<Ticket> findByCurrentUser(int page, int count, String userId) {
		Pageable pages = new PageRequest(page, count);
		return this.ticketRepository.findByUserIdOrderByDateDesc(pages, userId);
	}

	@Override
	public Page<Ticket> findByParameters(int page, int count, String title, String status, String priority) {
		Pageable pages = new PageRequest(page, count);
		return this.ticketRepository.findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingOrderByDateDesc(title, status,
				priority, pages);
	}

	@Override
	public Page<Ticket> findByParametersCurrentUser(int page, int count, String title, String status, String priority,
			String userId) {
		Pageable pages = new PageRequest(page, count);
		return this.ticketRepository.findByTitleContainingIgnoreCaseAndStatusContainingAndPriorityContainingAndUserIdOrderByDateDesc(title,
				status, priority,userId, pages);
	}

	@Override
	public Page<Ticket> findByNumber(int page, int count, Integer number) {
		Pageable pages = new PageRequest(page, count);
		return this.ticketRepository.findByNumber(number, pages);
	}

	@Override
	public Iterable<Ticket> findAll() {
		return this.ticketRepository.findAll();
	}

	@Override
	public Page<Ticket> findByParameterAndAssignedUser(int page, int count, String title, String status,
			String priority, String assignedUser) {
		Pageable pages = new PageRequest(page, count);
		return this.ticketRepository.findByTitleIgnoreCaseContainingAndStatusContainingAndPriorityContainingAndAssignedUserOrderByDateDesc(
				title, status, priority,assignedUser, pages);
	}

	private void creatadeOrUpdadteTicket(Ticket ticket, HttpServletRequest request) {
		if (ticket.getId() != null) {
			Ticket ticketFind = this.ticketRepository.findOne(ticket.getId());
			if (ticketFind != null) {
				ticket.setStatus(ticketFind.getStatus());
				ticket.setUser(ticketFind.getUser());
				ticket.getUser().setPassword(null);
				ticket.setDate(ticketFind.getDate());
				ticket.setNumber(ticketFind.getNumber());
				if (ticketFind.getAssignedUser() != null) {
					ticket.setAssignedUser(ticketFind.getAssignedUser());
				}
			}
		} else {
			ticket.setStatus(Status.getStatus("NEW"));
			ticket.setDate(this.util.getDateCurrente());
			ticket.setUser(this.util.userFromRequest(request));
			ticket.getUser().setPassword(null);
			ticket.setNumber(this.util.generateNumber());
		}
		return;
	}

	private List<ChangesStatus> findChanges(String ticketId) {
		List<ChangesStatus> changes = new ArrayList<ChangesStatus>();
		Iterable<ChangesStatus> changesCurrent = this.changesStatusRepository
				.findByTicketIdOrderByDateChangeStatusDesc(ticketId);
		for (Iterator<ChangesStatus> iterator = changesCurrent.iterator(); iterator.hasNext();) {
			ChangesStatus changesStatus = (ChangesStatus) iterator.next();
			changesStatus.setTicket(null);
			changes.add(changesStatus);
		}
		return changes;
	}


}
