package com.jdc.clinic.security.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jdc.clinic.domain.auth.repo.AccountRepo;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	private AccountRepo repo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return repo.findById(username)
				.map(account -> User.withUsername(username)
						.password(account.getPassword())
						.authorities(account.getType().name())
						.build())
				.orElseThrow(() -> new UsernameNotFoundException("There is no user with email %s.".formatted(username)));
	}

}
