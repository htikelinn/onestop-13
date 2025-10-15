package com.jdc.clinic.security.output;

import java.time.LocalDate;

import com.jdc.clinic.domain.auth.entity.Role;
import com.jdc.clinic.domain.auth.entity.Role_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record RoleItem(
		int id,
		String name,
		String description,
		boolean deleted,
		LocalDate createdAt,
		LocalDate modifiedAt) {

	public static void select(CriteriaQuery<RoleItem> cq, Root<Role> root) {
		cq.multiselect(
			root.get(Role_.id),
			root.get(Role_.name),
			root.get(Role_.description),
			root.get(Role_.deleted),
			root.get(Role_.createdAt),
			root.get(Role_.modifiedAt)
		);
	}

}
