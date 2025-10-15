package com.jdc.clinic.security.input;

import jakarta.validation.constraints.NotBlank;

public record RoleFormItem(
		@NotBlank(message = "Please select feature.")
		String path,
		boolean read,
		boolean write,
		boolean modify,
		boolean delete) {

}
