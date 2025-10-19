package com.jdc.clinic.security.output;

import com.jdc.clinic.domain.auth.entity.Permission;
import com.jdc.clinic.domain.auth.entity.Permission.Type;

public record RolePermission(
		String path,
		String icon,
		String name, 
		Type permission) {

	public static RolePermission from(Permission entity) {
		return new RolePermission(
				entity.getFeature().getPath(),
				entity.getFeature().getIcon(), 
				entity.getFeature().getName(), 
				entity.getPermission());
	}
}
