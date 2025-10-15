package com.jdc.clinic.master.input;

import com.jdc.clinic.domain.master.entity.Department;

import jakarta.validation.constraints.NotBlank;

public record DepartmentForm(
		@NotBlank(message = "Please enter department name.")
		String name,
		@NotBlank(message = "Please enter department phone.")
		String phone,
		String icon,
		String description) {

	public Department entity() {
		var entity = new Department();
		entity.setName(name);
		entity.setPhone(phone);
		entity.setIcon(icon);
		entity.setDescription(description);
		return entity;
	}

	public void update(Department entity) {
		entity.setName(name);
		entity.setPhone(phone);
		entity.setIcon(icon);
		entity.setDescription(description);
	}

}
