package com.jdc.clinic.utils.security;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;

import com.jdc.clinic.auth.input.RefreshForm;
import com.jdc.clinic.auth.input.SignInForm;
import com.jdc.clinic.auth.output.AuthResponse;
import com.jdc.clinic.domain.auth.repo.AccountRepo;

@Service
public class AuthService {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private AccountRepo accountRepo;
	@Autowired
	private JwtTokenProvider tokenProvider;

	public AuthResponse signIn(SignInForm form) {
		
		var authentication = authenticationManager.authenticate(form.authentication());
		
		var account = safeCall(accountRepo.findById(form.email()), 
				"account", "email", form.email());
		
		return AuthResponse.builder()
				.name(account.getName())
				.email(account.getEmail())
				.role(account.getType())
				.accessToken(tokenProvider.generateAccess(authentication))
				.refreshToken(tokenProvider.generateRefresh(authentication))
				.build();
	}

	public AuthResponse refresh(RefreshForm form) {
		
		var authentication = tokenProvider.parseRefresh(form.token());
		
		var account = safeCall(accountRepo.findById(authentication.getName()), 
				"account", "email", authentication.getName());

		return AuthResponse.builder()
				.name(account.getName())
				.email(account.getEmail())
				.role(account.getType())
				.accessToken(tokenProvider.generateAccess(authentication))
				.refreshToken(tokenProvider.generateRefresh(authentication))
				.build();
	}

	
}
