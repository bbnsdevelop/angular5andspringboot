package com.helpdeskservice.security.jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.helpdeskservice.entities.User;
import com.helpdeskservice.entities.enumerators.Profile;

public class JwtUserfactory {
	
	private JwtUserfactory() {
		
	}
	
	public static JwtUser create(User user) {
		return new JwtUser(
				user.getId(), 
				user.getEmail(), 
				user.getPassword(), 
				mapToGrantedAuthorities(user.getProfile()));
				
	}

	private static Collection<? extends GrantedAuthority> mapToGrantedAuthorities(Profile profile) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(profile.toString()));
		return authorities;
	}

}
