package com.jdc.clinic.employee;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.auth.output.MenuGroup;
import com.jdc.clinic.security.service.MenuService;

@RestController
@RequestMapping("/staff/menu")
public class MenuApi {
	
	@Autowired
	private MenuService service;
	
	@GetMapping("{email}")
	@PreAuthorize("#email eq authentication.name")
	List<MenuGroup> getMenu(@PathVariable String email) {
		return service.getUserMenu(email);
	}
}
