package com.jdc.clinic.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.jdc.clinic.domain.auth.entity.Employee;

public record EmployeeDetails(
		int id,
		String name,
		int roleId,
		String role,
		String roleDescription,
		String phone,
		String email,
		LocalDate assignAt,
		LocalDate retiredAt, 
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt,
		String modifiedBy) {
	
	public static EmployeeDetails from(Employee entity) {
		return new EmployeeDetails(
				entity.getId(), 
				entity.getAccount().getName(), 
				entity.getRole().getId(), 
				entity.getRole().getName(), 
				entity.getRole().getDescription(), 
				entity.getPhone(), 
				entity.getAccount().getEmail(), 
				entity.getAssignAt(), 
				entity.getRetiredAt(), 
				entity.isDeleted(), 
				entity.getCreatedAt(), 
				entity.getCreatedBy(),
				entity.getModifiedAt(),
				entity.getModifiedBy());
	}

}
