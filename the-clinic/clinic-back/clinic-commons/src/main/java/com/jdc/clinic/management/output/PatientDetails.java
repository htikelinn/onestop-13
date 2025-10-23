package com.jdc.clinic.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.clinic.domain.auth.Address;
import com.jdc.clinic.domain.master.entity.Patient.Gender;

public record PatientDetails(
		int id,
		String name,
		String phone,
		String email,
		LocalDate dob,
		Gender gender,
		Address address,
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt,
		String modifiedBy) {

}
