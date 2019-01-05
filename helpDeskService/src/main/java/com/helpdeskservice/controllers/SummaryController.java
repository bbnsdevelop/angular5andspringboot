package com.helpdeskservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.helpdeskservice.dto.Summary;
import com.helpdeskservice.response.Response;
import com.helpdeskservice.service.SummaryService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SummaryController {

	@Autowired
	private SummaryService summaryService;
	
	

	@GetMapping("/summary")
	@PreAuthorize("hasAnyRole('CUSTOMER', 'TECHICIAN')")
	public ResponseEntity<Response<Summary>> findSummary(){
		 Response<Summary> response = new Response<Summary>();
		 response.setData(this.summaryService.findSummary());
		 
		return ResponseEntity.ok(response);
	}
	
	
}
