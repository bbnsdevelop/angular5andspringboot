package com.helpdeskservice.entities.enumerators;

public enum Status {
	
	NEW,
	RESOLVED,
	ASSIGNED,
	APPROVED,
	DISAPPROVED,
	CLOSE;
	
	public static Status getStatus(String status) {
		switch (status) {
		case "NEW": return NEW;
		case "RESOLVED": return RESOLVED;
		case "ASSIGNED": return ASSIGNED;
		case "APPROVED": return APPROVED;
		case "DISAPPROVED": return DISAPPROVED;
		case "CLOSE": return CLOSE;
		default: return NEW;
		}
	}
}
