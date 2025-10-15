package com.jdc.clinic.management.input;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EmployeeForm(
		@NotBlank(message = "Please enter employee name.")
		String name,
		@NotBlank(message = "Please enter email.")
		String email,
		@NotNull(message = "Please select a role.")
		Integer roleId,
		@NotBlank(message = "Please enter phone number.")
		String phone,
		@NotNull(message = "Please enter assign date.")
		LocalDate assignAt,
		LocalDate retiredAt) {

}
