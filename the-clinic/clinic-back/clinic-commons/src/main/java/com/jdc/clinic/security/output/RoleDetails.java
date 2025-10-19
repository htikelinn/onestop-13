package com.jdc.clinic.security.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.clinic.domain.auth.entity.Role;

public record RoleDetails(		
		int id,
		String name,
		String description,
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt, 
		String modifiedBy,
		List<RolePermission> permissions) {

	public static RoleDetails from(Role entity) {
		return new RoleDetails(
				entity.getId(), 
				entity.getName(), 
				entity.getDescription(), 
				entity.isDeleted(), 
				entity.getCreatedAt(), 
				entity.getCreatedBy(),
				entity.getModifiedAt(),
				entity.getModifiedBy(),
				entity.getPermissions().stream()
					.map(RolePermission::from).toList());
	}
}
