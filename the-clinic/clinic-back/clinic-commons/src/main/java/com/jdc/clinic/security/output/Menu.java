package com.jdc.clinic.security.output;

import java.util.List;

public record Menu(
		String name,
		String icon,
		String path,
		List<SubMenu> items) {

}
