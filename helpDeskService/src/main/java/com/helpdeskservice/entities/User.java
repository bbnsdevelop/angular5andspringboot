package com.helpdeskservice.entities;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.helpdeskservice.entities.enumerators.Profile;

@Document
public class User {

	@Id
	private String id;
	
	@Indexed(unique = true)
	@NotNull(message = "Email riquired")
	@Email(message = "Email invalid")
	private String email;
	
	@NotNull(message = "Passowrd riquired")
	@Size(min = 6)
	private String password;
	
	private Profile profile;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Profile getProfile() {
		return profile;
	}

	public void setProfile(Profile profile) {
		this.profile = profile;
	}
	
	
	
}
