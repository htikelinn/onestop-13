package com.jdc.clinic.management.input;

import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.clinic.domain.auth.entity.Account_;
import com.jdc.clinic.domain.auth.entity.Role_;
import com.jdc.clinic.domain.master.entity.Employee;
import com.jdc.clinic.domain.master.entity.Employee_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record EmployeeSearch(
		Integer roleId,
		LocalDate assignFrom, 
		LocalDate assignto, 
		Boolean deleted,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<Employee> root) {
		
		var params = new ArrayList<>();
		
		if(null != roleId) {
			params.add(cb.equal(root.get(Employee_.role).get(Role_.id), roleId));
		}
		
		if(null != assignFrom) {
			params.add(cb.greaterThanOrEqualTo(root.get(Employee_.assignAt), assignFrom));
		}
		
		if(null != assignto) {
			params.add(cb.lessThanOrEqualTo(root.get(Employee_.assignAt), assignto));
		}
		
		if(null != deleted) {
			params.add(cb.equal(root.get(Employee_.deleted), deleted));
		}
		
		if(StringUtils.hasLength(keyword)) {
			params.add(cb.or(
				cb.like(cb.lower(root.get(Employee_.account).get(Account_.name)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Employee_.account).get(Account_.email)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(root.get(Employee_.phone)), keyword.toLowerCase().concat("%"))
			));
		}

		return params.toArray(size -> new Predicate[size]);
	}

}
