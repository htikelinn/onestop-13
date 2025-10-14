package com.jdc.clinic.anonymous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.anonymous.service.AuthService;
import com.jdc.clinic.anonymous.service.SignUpService;
import com.jdc.clinic.auth.input.RefreshForm;
import com.jdc.clinic.auth.input.SignInForm;
import com.jdc.clinic.auth.input.SignUpForm;
import com.jdc.clinic.auth.output.AuthResponse;

@RestController
@RequestMapping("auth")
public class AuthenticationApi {
	
	@Autowired
	private AuthService authService;
	
	@Autowired
	private SignUpService signUpService;

	@PostMapping("signin")
	AuthResponse signIn(@RequestBody @Validated SignInForm form) {
		return authService.signIn(form);
	}
	
	@PostMapping("signup")
	AuthResponse signUp(@RequestBody @Validated SignUpForm form) {
		var account = signUpService.signUp(form);
		return authService.signIn(new SignInForm(account.getEmail(), form.password()));
	}
	
	@PostMapping("refresh")
	AuthResponse refresh(@RequestBody @Validated RefreshForm form) {
		return authService.refresh(form);
	}
}
