package com.jdc.clinic.master.output;

import java.time.LocalDateTime;

import com.jdc.clinic.domain.master.entity.Doctor;

public record DoctorDetails(
		int id,
		String name,
		String phone,
		String email,
		String title,
		int departmentId,
		String department,
		int roleId,
		String roleName,
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt,
		String modifiedBy) {
	
	public static DoctorDetails from(Doctor entity) {
		return null;
	}

}
