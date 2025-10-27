package com.jdc.clinic.anonymous.output;

import java.time.LocalDate;

public record PublicSchedule(
		LocalDate date,
		String scheduleTime,
		int tokens) {

}
