package com.jdc.clinic.management.output;

import java.time.LocalDate;

public record EmployeeListItem(
		int id,
		String name,
		String role,
		String phone,
		String email,
		LocalDate assignAt,
		LocalDate retiredAt) {

}
