package com.jdc.clinic.tx.input;

import java.time.LocalDate;

import com.jdc.clinic.domain.master.entity.Doctor;
import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.entity.Appointment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PublicAppointmentForm(
		@NotNull(message = "Please select doctor.")
		Integer doctorId,
		@NotNull(message = "Please select date.")
		LocalDate scheduleDate,
		@NotBlank(message = "Please select time.")
		String scheduleTime,
		@NotBlank(message = "Please enter patient name.")
		String patientName,
		@NotNull(message = "Please select date of birth.")
		LocalDate dateOfBirth,
		@NotBlank(message = "Please enter phone number.")
		String phone,
		@NotBlank(message = "Please enter reason to visit.")
		String chiefComplaint) {

	public Appointment entity(Doctor doctor, AppointmentPk id) {
		var entity = new Appointment();
		entity.setId(id);
		entity.setDoctor(doctor);
		entity.setPatientName(patientName);
		entity.setDob(dateOfBirth);
		entity.setPhone(phone);
		entity.setChiefComplaint(chiefComplaint);
		return entity;
	}

}
