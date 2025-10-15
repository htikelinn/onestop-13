package com.jdc.clinic.security.output;

import com.jdc.clinic.domain.auth.entity.Permission;

public record RolePermission(
		String path,
		String icon,
		String name, 
		boolean read,
		boolean write,
		boolean modify,
		boolean delete) {

	public static RolePermission from(Permission entity) {
		return new RolePermission(
				entity.getFeature().getPath(),
				entity.getFeature().getIcon(), 
				entity.getFeature().getName(), 
				entity.isRead(), 
				entity.isWrite(), 
				entity.isModify(), 
				entity.isDelete());
	}
}
