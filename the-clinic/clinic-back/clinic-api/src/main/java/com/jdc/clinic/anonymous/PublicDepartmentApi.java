package com.jdc.clinic.anonymous;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.master.input.DepartmentSearch;
import com.jdc.clinic.master.output.DepartmentDetails;
import com.jdc.clinic.master.output.DepartmentListItem;
import com.jdc.clinic.master.service.DepartmentService;

@RestController
@RequestMapping("anonymous/department")
public class PublicDepartmentApi {
	
	@Autowired
	private DepartmentService service;

	@GetMapping
	List<DepartmentListItem> index() {
		return service.search(DepartmentSearch.builder().deleted(false).build());
	}
	
	@GetMapping("{id}")
	DepartmentDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
}
