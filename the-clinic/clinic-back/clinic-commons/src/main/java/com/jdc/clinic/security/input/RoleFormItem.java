package com.jdc.clinic.security.input;

import jakarta.validation.constraints.NotBlank;
import com.jdc.clinic.domain.auth.entity.Permission.Type;

public record RoleFormItem(
		@NotBlank(message = "Please select feature.")
		String path,
		Type permission) {

}
