package com.jdc.clinic.auth.input;

import jakarta.validation.constraints.NotBlank;

public record SignInForm(
		@NotBlank(message = "Please enter email.")
		String email,
		@NotBlank(message = "Please enter password.")
		String password) {

}
