package com.jdc.clinic.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.clinic.domain.master.entity.Patient.Gender;

public record PatientListItem(
		int id,
		String name,
		String phone,
		String email,
		LocalDate dob,
		Gender gender,
		String region,
		String township,
		boolean deleted,
		LocalDateTime cretedAt,
		LocalDateTime modifiedAt) {

}
