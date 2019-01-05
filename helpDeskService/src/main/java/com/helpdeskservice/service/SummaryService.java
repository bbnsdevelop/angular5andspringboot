package com.helpdeskservice.service;

import org.springframework.stereotype.Component;

import com.helpdeskservice.dto.Summary;

@Component
public interface SummaryService {
	
	Summary findSummary();
}
