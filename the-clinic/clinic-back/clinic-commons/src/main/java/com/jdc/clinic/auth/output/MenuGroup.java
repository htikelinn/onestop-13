package com.jdc.clinic.auth.output;

import java.util.List;

public record MenuGroup(
		String group,
		List<MenuItem> items) {

}
