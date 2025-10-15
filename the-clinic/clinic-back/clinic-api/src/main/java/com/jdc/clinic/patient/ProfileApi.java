package com.jdc.clinic.patient;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("patient/profile")
public class ProfileApi {

	@GetMapping
	List<String> getProfile() {
		return List.of("Hello Patient");
	}
}
