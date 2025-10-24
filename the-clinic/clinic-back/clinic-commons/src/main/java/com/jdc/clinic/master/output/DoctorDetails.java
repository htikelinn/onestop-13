package com.jdc.clinic.master.output;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.jdc.clinic.domain.master.Schedule;
import com.jdc.clinic.domain.master.entity.Doctor;

public record DoctorDetails(
		int id,
		String name,
		String phone,
		String email,
		LocalDate assignAt,
		LocalDate retiredAt,
		String title,
		String degree,
		int departmentId,
		String department,
		int roleId,
		String roleName,
		List<Schedule> schedules,
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt,
		String modifiedBy) {
	
	public static DoctorDetails from(Doctor entity) {
		return new DoctorDetails(
			entity.getId(), 
			entity.getEmployee().getAccount().getName(), 
			entity.getEmployee().getPhone(), 
			entity.getEmployee().getAccount().getEmail(), 
			entity.getEmployee().getAssignAt(),
			entity.getEmployee().getRetiredAt(),
			entity.getTitle(), entity.getDegree(), 
			entity.getDepartment().getId(), 
			entity.getDepartment().getName(), 
			entity.getEmployee().getRole().getId(), 
			entity.getEmployee().getRole().getName(), 
			entity.getSchedules(),
			entity.isDeleted(), 
			entity.getCreatedAt(), 
			entity.getCreatedBy(), 
			entity.getModifiedAt(), 
			entity.getModifiedBy());
	}

}
