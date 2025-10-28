package com.jdc.clinic.tx.input;

import jakarta.validation.constraints.NotBlank;

public record AppointmentCancelForm(
		@NotBlank(message = "Please enter reason to cencel.")
		String reason) {

}
