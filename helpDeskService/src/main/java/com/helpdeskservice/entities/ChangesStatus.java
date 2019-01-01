package com.helpdeskservice.entities;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import com.helpdeskservice.entities.enumerators.Status;

@Document
public class ChangesStatus {

	@Id
	private String id;
	
	@DBRef
	private Tikect tikect;
	
	@DBRef
	private User userChange;
	
	private Date dateChangeStatus;
	
	private Status status;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Tikect getTikect() {
		return tikect;
	}

	public void setTikect(Tikect tikect) {
		this.tikect = tikect;
	}

	public Date getDateChangeStatus() {
		return dateChangeStatus;
	}

	public void setDateChangeStatus(Date dateChangeStatus) {
		this.dateChangeStatus = dateChangeStatus;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
	
}
