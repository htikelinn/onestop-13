package com.jdc.clinic.staff.master;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.master.input.DepartmentForm;
import com.jdc.clinic.master.input.DepartmentSearch;
import com.jdc.clinic.master.output.DepartmentDetails;
import com.jdc.clinic.master.output.DepartmentListItem;
import com.jdc.clinic.master.service.DepartmentService;
import com.jdc.clinic.utils.ModificationResult;

@RestController
@RequestMapping("staff/department")
public class DepartmentApi {
	
	@Autowired
	private DepartmentService service;

	@GetMapping
	List<DepartmentListItem> search(DepartmentSearch search) {
		return service.search(search);
	}
	
	@GetMapping("{id}")
	DepartmentDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@Validated @RequestBody DepartmentForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@Validated @RequestBody DepartmentForm form) {
		return service.update(id, form);
	}
	
}
