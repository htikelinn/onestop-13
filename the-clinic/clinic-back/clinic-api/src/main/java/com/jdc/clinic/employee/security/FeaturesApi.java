package com.jdc.clinic.employee.security;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jdc.clinic.security.input.FeatureSearch;
import com.jdc.clinic.security.output.AppFeature;

@RestController
@RequestMapping("/employee/features")
public class FeaturesApi {

	@GetMapping
	List<AppFeature> search(FeatureSearch search) {
		return null;
	}
}
