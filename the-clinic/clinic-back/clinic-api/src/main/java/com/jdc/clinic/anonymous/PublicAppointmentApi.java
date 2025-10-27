package com.jdc.clinic.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.anonymous.service.PublicAppointmentService;
import com.jdc.clinic.tx.input.PublicAppointmentForm;
import com.jdc.clinic.tx.output.PublicAppointmentResult;
import com.jdc.clinic.utils.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/appointment")
public class PublicAppointmentApi {
	
	private final PublicAppointmentService service;

	@PostMapping
	ModificationResult<String> create(
			@Validated @RequestBody PublicAppointmentForm form) {
		return service.create(form);
	}
	
	@GetMapping("{id}")
	PublicAppointmentResult findById(@PathVariable String id) {
		return service.findById(id);
	}
}
