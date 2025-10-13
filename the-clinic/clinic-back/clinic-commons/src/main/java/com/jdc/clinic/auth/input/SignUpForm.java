package com.jdc.clinic.auth.input;

import jakarta.validation.constraints.NotBlank;

public record SignUpForm(
		@NotBlank(message = "Please enter name.")
		String name,
		@NotBlank(message = "Please enter email.")
		String email,
		@NotBlank(message = "Please enter password.")
		String password) {

}
