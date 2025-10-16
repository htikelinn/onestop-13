package com.jdc.clinic.management.output;

import java.time.LocalDate;

import com.jdc.clinic.domain.auth.entity.Account_;
import com.jdc.clinic.domain.auth.entity.Employee;
import com.jdc.clinic.domain.auth.entity.Employee_;
import com.jdc.clinic.domain.auth.entity.Role_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record EmployeeListItem(
		int id,
		String name,
		String role,
		String phone,
		String email,
		LocalDate assignAt,
		LocalDate retiredAt) {

	public static void select(CriteriaQuery<EmployeeListItem> cq, Root<Employee> root) {
		
		var account = root.join(Employee_.account);
		
		cq.multiselect(
			root.get(Employee_.id),
			account.get(Account_.name),
			root.get(Employee_.role).get(Role_.name),
			root.get(Employee_.phone),
			account.get(Account_.email),
			root.get(Employee_.assignAt),
			root.get(Employee_.retiredAt)
		);
	}

}
