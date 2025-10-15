package com.jdc.clinic.staff.management;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.domain.PageResult;
import com.jdc.clinic.management.input.EmployeeForm;
import com.jdc.clinic.management.input.EmployeeSearch;
import com.jdc.clinic.management.output.EmployeeDetails;
import com.jdc.clinic.management.output.EmployeeListItem;
import com.jdc.clinic.utils.ModificationResult;

@RestController
@RequestMapping("staff/employee")
public class EmployeeManagementApi {

	@GetMapping
	PageResult<EmployeeListItem> search(
			EmployeeSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@GetMapping("{id}")
	EmployeeDetails findById(@PathVariable int id) {
		return null;
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated EmployeeForm form) {
		return null;
	}

	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated EmployeeForm form) {
		return null;
	}
}
