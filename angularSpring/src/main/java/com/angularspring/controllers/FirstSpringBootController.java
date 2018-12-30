package com.angularspring.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class FirstSpringBootController {
	
	
	@GetMapping("/hello")
	public String showTeste() {
		return "Hello, first spring boot project";
	}
	
	@GetMapping("/")
	public String index() {
		return "index page";
	}
	

}
