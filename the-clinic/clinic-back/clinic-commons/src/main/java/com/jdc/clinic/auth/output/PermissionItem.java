package com.jdc.clinic.auth.output;

import com.jdc.clinic.domain.auth.entity.Permission.Type;

public record PermissionItem(
		String path,
		Type permission) {

}
