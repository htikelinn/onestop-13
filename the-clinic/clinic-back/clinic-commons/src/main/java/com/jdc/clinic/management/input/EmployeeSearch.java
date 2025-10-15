package com.jdc.clinic.management.input;

import java.time.LocalDate;

public record EmployeeSearch(
		Integer roleId,
		LocalDate assignFrom, 
		LocalDate assignto, 
		String keyword) {

}
