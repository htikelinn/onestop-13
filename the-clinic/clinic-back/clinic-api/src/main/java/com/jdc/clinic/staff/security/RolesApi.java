package com.jdc.clinic.staff.security;

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

import com.jdc.clinic.security.input.RoleForm;
import com.jdc.clinic.security.input.RoleSearch;
import com.jdc.clinic.security.output.RoleDetails;
import com.jdc.clinic.security.output.RoleItem;
import com.jdc.clinic.security.service.RoleService;
import com.jdc.clinic.utils.ModificationResult;

@RestController
@RequestMapping("/employee/role")
public class RolesApi {
	
	@Autowired
	private RoleService service;

	@GetMapping
	List<RoleItem> search(RoleSearch search) {
		return service.search(search);
	}
	
	@GetMapping("{id}")
	RoleDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@Validated @RequestBody RoleForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(@PathVariable int id,
			@Validated @RequestBody RoleForm form) {
		return service.update(id, form);
	}
}
