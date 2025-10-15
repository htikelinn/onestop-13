package com.jdc.clinic.security.output;

import com.jdc.clinic.domain.auth.entity.Feature;
import com.jdc.clinic.domain.auth.entity.Feature_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record AppFeature(
		String path, 
		String name,
		String icon,
		String group) {

	public static void select(CriteriaQuery<AppFeature> cq, Root<Feature> root) {
		cq.multiselect(
			root.get(Feature_.path),
			root.get(Feature_.name),
			root.get(Feature_.icon),
			root.get(Feature_.category)
		);
	}

}
