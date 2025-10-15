package com.jdc.clinic.domain.master;

import java.io.Serializable;
import java.time.DayOfWeek;
import java.time.LocalTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record Schedule(
		@NotNull(message = "Please select schedule day.")
		DayOfWeek day,
		@NotBlank(message = "Please enter start time.")
		LocalTime start,
		@NotBlank(message = "Please enter end time.")
		LocalTime end) implements Serializable {

}
