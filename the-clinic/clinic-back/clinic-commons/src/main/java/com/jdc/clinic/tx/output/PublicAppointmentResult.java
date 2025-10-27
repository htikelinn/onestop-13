package com.jdc.clinic.tx.output;

import java.time.LocalDate;

import com.jdc.clinic.domain.trx.entity.Appointment;

public record PublicAppointmentResult(
		String doctor,
		LocalDate scheduleDate,
		String scheduleTime,
		int tokenNumber) {

	public static PublicAppointmentResult from(Appointment entity) {
		return new PublicAppointmentResult(
				entity.getDoctor().getEmployee().getAccount().getName(), 
				entity.getId().getScheduleDate(), 
				entity.getId().getScheduleTime(), 
				entity.getId().getTokenNumber());
	}

}
