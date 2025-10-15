package com.jdc.clinic.staff.master;

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

import com.jdc.clinic.master.input.DoctorForm;
import com.jdc.clinic.master.input.DoctorSearch;
import com.jdc.clinic.master.output.DoctorDetails;
import com.jdc.clinic.master.output.DoctorListItem;
import com.jdc.clinic.master.service.DoctorService;
import com.jdc.clinic.utils.ModificationResult;

@RestController
@RequestMapping("staff/doctor")
public class DoctorApi {
	
	@Autowired
	private DoctorService service;

	@GetMapping
	List<DoctorListItem> search(DoctorSearch search) {
		return service.search(search);
	}
	
	@GetMapping("{id}")
	DoctorDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
	
	@PostMapping
	ModificationResult<Integer> create(
			@Validated @RequestBody DoctorForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(
			@PathVariable int id,
			@Validated @RequestBody DoctorForm form) {
		return service.update(id, form);
	}

}
