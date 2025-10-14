package com.jdc.clinic.employee.security;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.security.output.Menu;

@RestController
@RequestMapping("/employee/menu")
public class MenuApi {
	
	@GetMapping
	@PreAuthorize("#email eq authentication.name")
	List<Menu> getMenus(@RequestParam String email) {
		return null;
	}

}
