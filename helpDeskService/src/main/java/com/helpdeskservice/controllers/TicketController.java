package com.helpdeskservice.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpdeskservice.entities.Ticket;
import com.helpdeskservice.response.Response;
import com.helpdeskservice.service.TicketService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class TicketController {
	
	
	@Autowired
	private TicketService ticketService;
	
	@PostMapping("/ticket")
	public ResponseEntity<Response<Ticket>> create(HttpServletRequest request, 
			@RequestBody Ticket ticket, BindingResult result){
		Response<Ticket> response = new Response<Ticket>();
		
		try {
			validateCreate(ticket, result);
			if(result.hasErrors()) {
				result.getAllErrors().forEach(error -> response.getErros().add(error.getDefaultMessage()));
				return ResponseEntity.badRequest().body(response);
			} 
			response.setData(this.ticketService.createOrUpdate(ticket, request));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(response);
		}
		
		return ResponseEntity.ok(response);
	}
	
	private void validateCreate(Ticket ticket, BindingResult result) {
		if(ticket.getTitle() == null) {
			result.addError(new ObjectError("Ticket", "Title no information"));
		}
	}
}
