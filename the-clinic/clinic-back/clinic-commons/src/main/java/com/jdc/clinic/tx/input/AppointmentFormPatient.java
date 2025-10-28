package com.jdc.clinic.tx.input;

import java.time.LocalDate;

import org.springframework.web.bind.annotation.PathVariable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AppointmentFormPatient(
		@PathVariable
		@NotNull(message = "Please select patient.")
		Integer patientId,
		@NotNull(message = "Please select doctor.")
		Integer doctorId,
		@NotNull(message = "Please select date.")
		LocalDate scheduleDate,
		@NotBlank(message = "Please select time.")
		String scheduleTime,
		@NotBlank(message = "Please enter reason to visit.")
		String chiefComplaint) {

}
