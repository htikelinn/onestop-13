package com.jdc.clinic.management.output;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
		LocalDateTime modifiedAt) {

}
