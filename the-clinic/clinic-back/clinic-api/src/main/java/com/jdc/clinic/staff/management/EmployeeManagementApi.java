package com.jdc.clinic.staff.management;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.jdc.clinic.management.service.EmployeeService;
import com.jdc.clinic.utils.ModificationResult;

@RestController
@RequestMapping("staff/employee")
public class EmployeeManagementApi {
	
	@Autowired
	private EmployeeService service;

	@GetMapping
	PageResult<EmployeeListItem> search(
			EmployeeSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@GetMapping("{id}")
	EmployeeDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@RequestBody @Validated EmployeeForm form) {
		return service.create(form);
	}

	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@RequestBody @Validated EmployeeForm form) {
		return service.update(id, form);
	}
}
