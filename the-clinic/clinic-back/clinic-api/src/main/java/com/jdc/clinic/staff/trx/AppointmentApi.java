package com.jdc.clinic.staff.trx;

import java.util.Arrays;
import java.util.List;

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
import com.jdc.clinic.domain.trx.entity.Appointment.Status;
import com.jdc.clinic.tx.input.AppointmentCancelForm;
import com.jdc.clinic.tx.input.AppointmentFormPatient;
import com.jdc.clinic.tx.input.AppointmentFormPublic;
import com.jdc.clinic.tx.input.AppointmentSearch;
import com.jdc.clinic.tx.output.AppointmentDetails;
import com.jdc.clinic.tx.output.AppointmentListItem;
import com.jdc.clinic.tx.output.OptionItem;
import com.jdc.clinic.tx.service.StaffAppointmentService;
import com.jdc.clinic.utils.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/staff/appointment")
public class AppointmentApi {
	
	private final StaffAppointmentService service;

	@GetMapping
	PageResult<AppointmentListItem> search(AppointmentSearch search, 
			@RequestParam(required = false, defaultValue = "0") int page, 
			@RequestParam(required = false, defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@GetMapping("{code}")
	AppointmentDetails findById(@PathVariable String code) {
		return service.findById(code);
	}
	
	@GetMapping("status")
	List<OptionItem> getStatusOptions() {
		return Arrays.stream(Status.values()).map(a -> new OptionItem(a.name(), a.getViewName())).toList();
	}
	
	@PostMapping
	ModificationResult<String> create(
			@RequestBody @Validated AppointmentFormPublic form) {
		return service.create(form);
	}
	
	@PostMapping("{patientId}")
	ModificationResult<String> createForPatient(
			@RequestBody @Validated AppointmentFormPatient form) {
		return null;
	}
	
	@PutMapping("{code}/cancel")
	ModificationResult<String> cancel(@PathVariable String code,
			@RequestBody @Validated AppointmentCancelForm form) {
		return null;
	}
}
