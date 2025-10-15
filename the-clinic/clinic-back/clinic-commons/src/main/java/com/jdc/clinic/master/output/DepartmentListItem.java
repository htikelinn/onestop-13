package com.jdc.clinic.master.output;

import java.time.LocalDateTime;

import com.jdc.clinic.domain.master.entity.Department;
import com.jdc.clinic.domain.master.entity.Department_;
import com.jdc.clinic.domain.master.entity.Doctor_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;

public record DepartmentListItem(		
		int id,
		String name,
		String icon,
		String phone,
		long doctors,
		boolean deleted,
		LocalDateTime createdAt,
		LocalDateTime modifiedAt) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<DepartmentListItem> cq, 
			Root<Department> root) {
		
		var doctor = root.join(Department_.doctors, JoinType.LEFT);
		
		cq.multiselect(
			root.get(Department_.id),
			root.get(Department_.name),
			root.get(Department_.icon),
			root.get(Department_.phone),
			cb.count(doctor.get(Doctor_.id)),
			root.get(Department_.deleted),
			root.get(Department_.createdAt),
			root.get(Department_.modifiedAt)
		);
		
		cq.groupBy(
			root.get(Department_.id),
			root.get(Department_.name),
			root.get(Department_.icon),
			root.get(Department_.phone),
			root.get(Department_.deleted),
			root.get(Department_.createdAt),
			root.get(Department_.modifiedAt)
		);
		
	}

}
