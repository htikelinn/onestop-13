package com.jdc.clinic.management.input;

import java.time.LocalDate;

import com.jdc.clinic.domain.master.entity.Patient.Gender;

public record PatientSearch(
		Gender gender,
		LocalDate dobFrom,
		LocalDate dobTo,
		String keyword) {

}
