package com.jdc.clinic.staff.trx;

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
import com.jdc.clinic.tx.input.AppointmentForm;
import com.jdc.clinic.tx.input.AppointmentSearch;
import com.jdc.clinic.tx.output.AppointmentDetails;
import com.jdc.clinic.tx.output.AppointmentListItem;
import com.jdc.clinic.utils.ModificationResult;

@RestController
@RequestMapping("/staff/appointment")
public class AppointmentApi {

	@GetMapping
	PageResult<AppointmentListItem> search(AppointmentSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return null;
	}
	
	@GetMapping("{code}")
	AppointmentDetails findById(@PathVariable String code) {
		return null;
	}
	
	@PostMapping
	ModificationResult<String> create(
			@RequestBody @Validated AppointmentForm form) {
		return null;
	}
	
	@PutMapping("{code}")
	ModificationResult<String> update(@PathVariable String code,
			@RequestBody @Validated AppointmentForm form) {
		return null;
	}
	
}
