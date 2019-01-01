package com.springData.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springData.entities.Students;
import com.springData.repositories.StudentsRepository;

@RestController
@RequestMapping("/api")
public class StudentsController {

	@Autowired
	private StudentsRepository studentsRepository;
	
	@GetMapping("/student")
	public List<Students> listStudents(){
		return this.studentsRepository.findAll();
	}
	
	@PostMapping("/student")
	public Students save(@RequestBody Students students) {
		return this.studentsRepository.save(students);
	}
	
	@GetMapping("/student/{id}")
	public Students findById(@PathVariable("id") String id) {
		return this.studentsRepository.findById(id).get();
	}
	
	@GetMapping("/student/{name}/name")
	public List<Students> listStudents(@PathVariable("name") String name){
		return this.studentsRepository.findByNameLikeIgnoreCase(name);
	}
	
}
