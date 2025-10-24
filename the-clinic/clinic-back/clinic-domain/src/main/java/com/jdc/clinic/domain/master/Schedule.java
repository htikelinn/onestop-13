package com.jdc.clinic.domain.master;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;

public record Schedule(
		@NotBlank(message = "Please select schedule day.")
		String day,
		@NotBlank(message = "Please enter start time.")
		String start,
		@NotBlank(message = "Please enter end time.")
		String end) implements Serializable {

}
