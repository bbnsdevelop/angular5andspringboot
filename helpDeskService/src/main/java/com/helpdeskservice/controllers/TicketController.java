package com.helpdeskservice.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpdeskservice.entities.Ticket;
import com.helpdeskservice.entities.User;
import com.helpdeskservice.entities.enumerators.Profile;
import com.helpdeskservice.response.Response;
import com.helpdeskservice.service.TicketService;
import com.helpdeskservice.utils.Utils;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@Autowired
	private Utils util;

	@PostMapping("/ticket")
	@PreAuthorize("hasAnyRole('CUSTOMER')")
	public ResponseEntity<Response<Ticket>> create(HttpServletRequest request, @RequestBody Ticket ticket,
			BindingResult result) {
		Response<Ticket> response = new Response<Ticket>();

		try {
			validateCreate(ticket, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			response.setData(this.ticketService.createOrUpdate(ticket, request));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(response);
		}

		return ResponseEntity.ok(response);
	}

	@PutMapping("/ticket")
	@PreAuthorize("hasAnyRole('CUSTOMER')")
	public ResponseEntity<Response<Ticket>> update(HttpServletRequest request, @RequestBody Ticket ticket,
			BindingResult result) {
		Response<Ticket> response = new Response<Ticket>();
		try {
			validateUpdate(ticket, result);
			if (result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			response.setData(this.ticketService.createOrUpdate(ticket, request));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);
	}

	@GetMapping("/ticket/{id}")
	@PreAuthorize("hasAnyRole('CUSTOMER', 'TECHICIAN')")
	public ResponseEntity<Response<Ticket>> findByid(@PathVariable("id") String id) {
		Response<Ticket> response = new Response<Ticket>();
		Ticket ticket = this.ticketService.findById(id);
		if (ticket == null) {
			response.getErrors().add("Register not found id:" + id);
			return ResponseEntity.badRequest().body(response);
		} else {
			response.setData(ticket);
			return ResponseEntity.ok(response);
		}

	}

	@DeleteMapping("/ticket/{id}")
	@PreAuthorize("hasAnyRole('CUSTOMER')")
	public ResponseEntity<Response<String>> delete(@PathVariable("id") String id) {
		Response<String> response = new Response<String>();
		try {
			this.ticketService.delete(id);
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		String msg = "Ticket success has deleted";
		response.setData(msg);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/ticket/{page}/{count}")
	@PreAuthorize("hasAnyRole('CUSTOMER', 'TECHICIAN')")
	public ResponseEntity<Response<Page<Ticket>>> findAll(HttpServletRequest request, @PathVariable("page") int page,
			@PathVariable("count") int count) {
		Response<Page<Ticket>> response = new Response<Page<Ticket>>();
		Page<Ticket> tickets = null;
		User user = this.util.userFromRequest(request);
		if (user.getProfile().equals(Profile.ROLE_TECNICIAN)) {
			tickets = this.ticketService.listTicket(page, count);
		} else if (user.getProfile().equals(Profile.ROLE_CUSTOMER)) {
			tickets = this.ticketService.findByCurrentUser(page, count, user.getId());
		}
		response.setData(tickets);
		return ResponseEntity.ok(response);

	}

	@GetMapping("/ticket/{page}/{count}/{number}/{title}/{status}/{priority}/{assigned}")
	@PreAuthorize("hasAnyRole('CUSTOMER', 'TECHICIAN')")
	public ResponseEntity<Response<Page<Ticket>>> findByParameter(HttpServletRequest request,
			@PathVariable("page") int page, @PathVariable("count") int count, @PathVariable("number") Integer number,
			@PathVariable("title") String title, @PathVariable("status") String status,
			@PathVariable("priority") String priority, @PathVariable("assigned") boolean assigned) {

		title = title.equals("uninformed") ? "" : title;
		status = status.equals("uninformed") ? "" : status;
		priority = priority.equals("uninformed") ? "" : priority;

		Response<Page<Ticket>> response = new Response<Page<Ticket>>();
		Page<Ticket> tickets = null;

		if (number > 0) {
			tickets = this.ticketService.findByNumber(page, count, number);
		} else {
			User user = this.util.userFromRequest(request);
			if (user.getProfile().equals(Profile.ROLE_TECNICIAN)) {
				if (assigned) {
					tickets = this.ticketService.findByParameterAndAssignedUser(page, count, title, status, priority,
							user.getId());
				} else {
					tickets = this.ticketService.findByParameters(page, count, title, status, priority);
				}
			} else if (user.getProfile().equals(Profile.ROLE_CUSTOMER)) {
				tickets = this.ticketService.findByParametersCurrentUser(page, count, title, status, priority,
						user.getId());
			}
		}
		response.setData(tickets);
		return ResponseEntity.ok(response);

	}

	@PutMapping("/ticket/{id}/{status}")
	@PreAuthorize("hasAnyRole('CUSTOMER', 'TECHICIAN')")
	public ResponseEntity<Response<Ticket>> changeStatus(@PathVariable("id") String id,
			@PathVariable("status") String status, HttpServletRequest request, @RequestBody Ticket ticket,
			BindingResult result) {
		Response<Ticket> response = new Response<Ticket>();
		try {
			validateChangeStatus(id, status, result);
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErrors().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			}
			ticket = this.ticketService.createOrUpdateTicketWithIdAndStatus(ticket, id, status, request);
			response.setData(ticket);			
		} catch (Exception e) {
			response.getErrors().add(e.getMessage());
			return ResponseEntity.badRequest().body(response);
		}
		return ResponseEntity.ok(response);

	}

	private void validateCreate(Ticket ticket, BindingResult result) {
		if (ticket.getTitle() == null) {
			result.addError(new ObjectError("Ticket", "Title no information"));
			return;
		}
	}

	private void validateUpdate(Ticket ticket, BindingResult result) {
		if (ticket.getTitle() == null || ticket.getId() == null) {
			if (ticket.getId() == null) {
				result.addError(new ObjectError("Ticket", "Id no information"));
			} else {
				result.addError(new ObjectError("Ticket", "Title no information"));
			}
			return;
		}
	}

	private void validateChangeStatus(String id, String status, BindingResult result) {
		if (id == null || id.equals("")) {
				result.addError(new ObjectError("Ticket", "Id no information"));
				return;
			}
		if(status == null || status.equals("")) {
			result.addError(new ObjectError("Ticket", "Status no information"));
			return;
		}
	}
}
