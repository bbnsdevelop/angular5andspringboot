package com.helpdeskservice.service.impl;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.helpdeskservice.dto.Summary;
import com.helpdeskservice.entities.Ticket;
import com.helpdeskservice.entities.enumerators.Status;
import com.helpdeskservice.service.SummaryService;
import com.helpdeskservice.service.TicketService;

@Service
public class SummaryServiceImpl implements SummaryService {

	@Autowired
	private TicketService ticketService;

	@Override
	public Summary findSummary() {
		Iterable<Ticket> tickets = this.ticketService.findAll();
		Summary summary = new Summary();
		if (tickets != null) {
			summary = execCalc(tickets);
		}
		return summary;
	}

	private Summary execCalc(Iterable<Ticket> tickets) {
		Integer amountNew = 0;
		Integer amountResolved = 0;
		Integer amountApproved = 0;
		Integer amountDisapproved = 0;
		Integer amountAssigned = 0;
		Integer amountClosed = 0;
		for (Iterator<Ticket> iterator = tickets.iterator(); iterator.hasNext();) {
			Ticket ticket = iterator.next();
			if (ticket.getStatus().equals(Status.NEW)) {
				amountNew++;
			} else if (ticket.getStatus().equals(Status.RESOLVED)) {
				amountResolved++;
			} else if (ticket.getStatus().equals(Status.APPROVED)) {
				amountApproved++;
			} else if (ticket.getStatus().equals(Status.DISAPPROVED)) {
				amountDisapproved++;
			} else if (ticket.getStatus().equals(Status.ASSIGNED)) {
				amountAssigned++;
			} else if (ticket.getStatus().equals(Status.CLOSE)) {
				amountClosed++;
			}
		}
		return returnSummaryTotal(amountNew, amountResolved, amountApproved, amountDisapproved, amountAssigned, amountClosed);
	}
	private Summary returnSummaryTotal(Integer amountNew, Integer amountResolved, Integer amountApproved,
			Integer amountDisapproved, Integer amountAssigned, Integer amountClosed) {
		return new Summary(amountNew, amountResolved, amountApproved, amountDisapproved, amountAssigned, amountClosed);
	}

}
