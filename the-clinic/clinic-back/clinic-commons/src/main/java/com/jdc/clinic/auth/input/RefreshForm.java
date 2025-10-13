package com.jdc.clinic.auth.input;

import jakarta.validation.constraints.NotBlank;

public record RefreshForm(
		@NotBlank(message = "Please enter refresh token.")
		String token) {

}
