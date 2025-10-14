package com.jdc.clinic.employee.management;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("staff/employee")
public class EmployeeManagementApi {

	@GetMapping
	List<String> search() {
		return List.of("Hello Admin");
	}
}
