package com.jdc.clinic.utils;

import java.util.Optional;

import com.jdc.clinic.domain.utils.ClinicBusinessException;

public class EntityOperations {

	public static <T> T safeCall(Optional<T> optional, String entity, String field, Object id) {
		return optional.orElseThrow(
				() -> new ClinicBusinessException("There is no %s with %s %s.".formatted(entity, field, id)));
	}
}
