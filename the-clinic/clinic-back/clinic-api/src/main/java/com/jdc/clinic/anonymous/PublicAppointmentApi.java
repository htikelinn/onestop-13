package com.jdc.clinic.anonymous;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.tx.input.AppointmentForm;
import com.jdc.clinic.tx.output.AppointmentDetails;

@RestController
@RequestMapping("anonymous/appointment")
public class PublicAppointmentApi {

	@PostMapping
	AppointmentDetails create(AppointmentForm form) {
		return null;
	}
}
