package com.jdc.clinic.master.input;

import java.time.LocalDate;
import java.util.List;

import com.jdc.clinic.domain.master.Schedule;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record DoctorForm(
		@NotBlank(message = "Please enter doctor name.")
		String name,
		@NotBlank(message = "Please enter doctor's email.")
		String email,
		@NotBlank(message = "Please enter doctor's phone.")
		String phone,
		@NotBlank(message = "Please enter assign date.")
		LocalDate assignAt,
		@NotNull(message = "Please select department.")
		Integer departmentId,
		@NotBlank(message = "Please enter job title.")
		String title,
		@NotBlank(message = "Please enter degree.")
		String degree,
		@NotEmpty(message = "Please enter schedules for doctor.")
		List<@Valid Schedule> schedules) {

}
