package com.jdc.clinic.security.input;

import java.util.List;

import com.jdc.clinic.domain.auth.entity.Role;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

public record RoleForm(
		@NotBlank(message = "Please enter role name.")
		String name,
		@NotBlank(message = "Please enter description.")
		String description,
		@NotEmpty(message = "Please select permissions.")
		List<@Valid RoleFormItem> permissions) {

	public Role entity() {
		
		var entity = new Role();
		entity.setName(name);
		entity.setDescription(description);
		
		return entity;
	}

}
