package com.jdc.clinic.anonymous;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.anonymous.output.PublicDoctorDetails;
import com.jdc.clinic.anonymous.output.PublicSchedule;
import com.jdc.clinic.master.input.DoctorSearch;
import com.jdc.clinic.master.output.DoctorListItem;
import com.jdc.clinic.master.service.DoctorService;

@RestController
@RequestMapping("anonymous/doctor")
public class PublicDoctorApi {
	
	@Autowired
	private DoctorService service;

	@GetMapping
	List<DoctorListItem> index() {
		return service.search(DoctorSearch.builder().deleted(false).build());
	}
	
	@GetMapping("{id}")
	PublicDoctorDetails findById(@PathVariable int id) {
		return service.findByIdForPublic(id);
	}
	
	@GetMapping("{id}/schedules")
	List<PublicSchedule> schedulesForDoctor(@PathVariable int id) {
		return service.getSchedules(id);
	}
}
