package com.jdc.clinic.tx.output;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import com.jdc.clinic.domain.auth.entity.Account_;
import com.jdc.clinic.domain.master.entity.Department_;
import com.jdc.clinic.domain.master.entity.Doctor_;
import com.jdc.clinic.domain.master.entity.Employee_;
import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.entity.Appointment;
import com.jdc.clinic.domain.trx.entity.Appointment.Status;
import com.jdc.clinic.domain.trx.entity.Appointment_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record AppointmentListItem(
		AppointmentPk id,
		String department,
		String doctorTitle,
		String doctorName,
		String patient,
		String phone,
		Status status,
		LocalDateTime createdAt) {
	
	public static void select(CriteriaQuery<AppointmentListItem> cq, Root<Appointment> root) {
		cq.multiselect(
			root.get(Appointment_.id),
			root.get(Appointment_.doctor).get(Doctor_.department).get(Department_.name),
			root.get(Appointment_.doctor).get(Doctor_.title),
			root.get(Appointment_.doctor).get(Doctor_.employee).get(Employee_.account).get(Account_.name),
			root.get(Appointment_.patientName),
			root.get(Appointment_.phone),
			root.get(Appointment_.status),
			root.get(Appointment_.createdAt)
		);
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
	
	public LocalDateTime getAppointAt() {
		return createdAt;
	}
	
	public String getDoctor() {
		return "%s %s".formatted(doctorTitle, doctorName);
	}
}
