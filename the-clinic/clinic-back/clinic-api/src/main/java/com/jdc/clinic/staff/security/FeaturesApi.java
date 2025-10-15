package com.jdc.clinic.staff.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.security.input.FeatureSearch;
import com.jdc.clinic.security.output.AppFeature;
import com.jdc.clinic.security.service.FeatureService;

@RestController
@RequestMapping("/staff/feature")
public class FeaturesApi {
	
	@Autowired
	private FeatureService service;

	@GetMapping
	List<AppFeature> search(FeatureSearch search) {
		return service.search(search);
	}
	
	@GetMapping("group")
	List<String> groups() {
		return service.findGroup();
	}
}
