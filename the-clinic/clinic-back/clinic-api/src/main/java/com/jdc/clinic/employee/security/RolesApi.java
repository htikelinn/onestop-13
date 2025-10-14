package com.jdc.clinic.employee.security;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.security.input.RoleSearch;
import com.jdc.clinic.security.output.RoleInfo;

@RestController
@RequestMapping("/employee/role")
public class RolesApi {

	@GetMapping
	List<RoleInfo> search(RoleSearch search) {
		return null;
	}
}
