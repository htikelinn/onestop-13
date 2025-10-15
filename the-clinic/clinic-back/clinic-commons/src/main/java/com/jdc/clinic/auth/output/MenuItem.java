package com.jdc.clinic.auth.output;

import com.jdc.clinic.domain.auth.entity.Feature;

public record MenuItem(
		String name,
		String icon,
		String path) {

	public static MenuItem from(Feature feature) {
		return new MenuItem(feature.getName(), 
				feature.getIcon(), 
				feature.getPath());
	}
}
