package com.jdc.clinic.tx.output;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.entity.Appointment;
import com.jdc.clinic.domain.trx.entity.Appointment.Status;

public record AppointmentDetails(
		AppointmentPk id,
		String department,
		String doctorTitle,
		String doctorName,
		String patient,
		String phone,
		LocalDate dob,
		String chiefComplaint,
		Status status,
		boolean registered,
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt,
		String modifiedBy) {

	public static AppointmentDetails from(Appointment entity) {
		return new AppointmentDetails(
				entity.getId(), 
				entity.getDoctor().getDepartment().getName(), 
				entity.getDoctor().getTitle(), 
				entity.getDoctor().getEmployee().getAccount().getName(), 
				entity.getPatientName(), 
				entity.getPhone(), 
				entity.getDob(), 
				entity.getChiefComplaint(), 
				entity.getStatus(), 
				null != entity.getPatient(), 
				entity.isDeleted(), 
				entity.getCreatedAt(), 
				entity.getCreatedBy(), 
				entity.getModifiedAt(), 
				entity.getModifiedBy());
	}
	
	public String getCode() {
		return Optional.ofNullable(id).map(a -> a.getCode()).orElse("");
	}


	public LocalDate getScheduleDate() {
		return Optional.ofNullable(id).map(a -> a.getScheduleDate()).orElse(null);
	}


	public String getScheduleTime() {
		return Optional.ofNullable(id).map(a -> a.getScheduleTime()).orElse("");
	}

	public int getTokenNumber() {
		return Optional.ofNullable(id).map(a -> a.getTokenNumber()).orElse(0);
	}	

	public String getDoctor() {
		return "%s %s".formatted(doctorTitle, doctorName);
	}
}
