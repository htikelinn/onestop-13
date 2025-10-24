package com.jdc.clinic.master.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.clinic.domain.master.entity.Department;
import com.jdc.clinic.domain.master.entity.Department_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record DepartmentSearch(
		Boolean deleted,
		String keyword) {
	
	public static class Builder {
		private Boolean deleted;
		private String keyword;
		
		public DepartmentSearch build() {
			return new DepartmentSearch(deleted, keyword);
		}
		
		public Builder deleted(Boolean deleted) {
			this.deleted = deleted;
			return this;
		}
		
		public Builder keyword(String keyword) {
			this.keyword = keyword;
			return this;
		}
	}
	
	public static Builder builder() { 
		return new Builder();
	}

	public Predicate[] where(CriteriaBuilder cb, Root<Department> root) {
		var params = new ArrayList<>();
		
		if(null != deleted) {
			params.add(cb.equal(root.get(Department_.deleted), deleted));
		}
		
		if(StringUtils.hasLength(keyword)) {
			params.add(cb.or(
				cb.like(cb.lower(root.get(Department_.name)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Department_.description)), "%%%s%%".formatted(keyword.toLowerCase()))
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
