package com.jdc.clinic.tx.input;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.clinic.domain.auth.entity.Account_;
import com.jdc.clinic.domain.master.entity.Doctor_;
import com.jdc.clinic.domain.master.entity.Employee_;
import com.jdc.clinic.domain.trx.AppointmentPk_;
import com.jdc.clinic.domain.trx.entity.Appointment;
import com.jdc.clinic.domain.trx.entity.Appointment_;
import com.jdc.clinic.domain.trx.entity.Appointment.Status;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record AppointmentSearch(
		Integer doctorId,
		Status status,
		LocalDate from,
		LocalDate to, 
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Appointment> root) {
		var params = new ArrayList<Predicate>();
		
		if(null != doctorId) {
			params.add(cb.equal(root.get(Appointment_.doctor).get(Doctor_.id), doctorId));
		}
		
		if(null != status) {
			params.add(cb.equal(root.get(Appointment_.status), status));
		}
		
		if(null != from) {
			params.add(cb.greaterThanOrEqualTo(root.get(Appointment_.id).get(AppointmentPk_.scheduleDate), from));
		}
		
		if(null != to) {
			params.add(cb.lessThanOrEqualTo(root.get(Appointment_.id).get(AppointmentPk_.scheduleDate), to));
		}
		
		if(StringUtils.hasLength(keyword)) {
			var keywordParam = keyword.toLowerCase().concat("%");
			var doctorName = root.get(Appointment_.doctor).get(Doctor_.employee).get(Employee_.account).get(Account_.name);
			var patientName = root.get(Appointment_.patientName);
			
			params.add(cb.or(
				cb.like(cb.lower(doctorName), keywordParam),
				cb.like(cb.lower(patientName), keywordParam)
			));
		}

		return params.toArray(size -> new Predicate[size]);
	}
}
