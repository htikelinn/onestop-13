package com.jdc.clinic.security.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.clinic.domain.auth.entity.Role;
import com.jdc.clinic.domain.auth.entity.Role_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record RoleSearch(
		Boolean deleted,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Role> root) {
		
		var params = new ArrayList<>();
		
		if(null != deleted) {
			// r.deleted = ?
			params.add(cb.equal(root.get(Role_.deleted), deleted));
		}
		
		if(StringUtils.hasLength(keyword)) {
			// (r.name like ? or r.description like ?)
			params.add(cb.or(
				cb.like(cb.lower(root.get(Role_.name)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Role_.description)), "%%%s%%".formatted(keyword.toLowerCase()))
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
