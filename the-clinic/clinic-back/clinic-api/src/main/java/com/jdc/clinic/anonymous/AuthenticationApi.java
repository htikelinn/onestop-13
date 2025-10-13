package com.jdc.clinic.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.auth.input.SignInForm;
import com.jdc.clinic.auth.input.SignUpForm;
import com.jdc.clinic.auth.output.AuthResponse;

@RestController
@RequestMapping("auth")
public class AuthenticationApi {

	@PostMapping("signin")
	AuthResponse signIn(@RequestBody @Validated SignInForm form) {
		return null;
	}
	
	@PostMapping("signup")
	AuthResponse signUp(@RequestBody @Validated SignUpForm form) {
		return null;
	}
}
