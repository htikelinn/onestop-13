package com.jdc.clinic.security.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.clinic.domain.auth.entity.Feature;
import com.jdc.clinic.domain.auth.entity.Feature_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record FeatureSearch(
		String group,
		String name) {

	public Predicate[] where(CriteriaBuilder cb, Root<Feature> root) {
		
		var params = new ArrayList<>();
		
		if(StringUtils.hasLength(group)) {
			params.add(cb.equal(root.get(Feature_.category), group));
		}
		
		if(StringUtils.hasLength(name)) {
			params.add(cb.like(cb.lower(root.get(Feature_.name)), name.toLowerCase().concat("%")));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
