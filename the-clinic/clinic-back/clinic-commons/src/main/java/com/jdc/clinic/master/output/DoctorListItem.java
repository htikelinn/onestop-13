package com.jdc.clinic.master.output;

import java.time.LocalDateTime;

import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Account_;
import com.jdc.clinic.domain.master.entity.Department;
import com.jdc.clinic.domain.master.entity.Department_;
import com.jdc.clinic.domain.master.entity.Doctor;
import com.jdc.clinic.domain.master.entity.Doctor_;
import com.jdc.clinic.domain.master.entity.Employee;
import com.jdc.clinic.domain.master.entity.Employee_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

public record DoctorListItem(
	int id,
	String name,
	String department,
	String phone,
	String email,
	String title,
	boolean deleted,
	LocalDateTime createdAt,
	LocalDateTime modifiedAt
) {

	public static DoctorListItem from(Doctor entity) {
		return new DoctorListItem(
				entity.getId(), 
				entity.getEmployee().getAccount().getName(), 
				entity.getDepartment().getName(), 
				entity.getEmployee().getPhone(), 
				entity.getEmployee().getAccount().getEmail(), 
				entity.getTitle(), 
				entity.isDeleted(), 
				entity.getCreatedAt(), 
				entity.getModifiedAt());
	}

	public static void select(CriteriaQuery<DoctorListItem> cq, 
			Root<Doctor> root, 
			Join<Doctor, Employee> employee,
			Join<Employee, Account> account, 
			Join<Doctor, Department> department) {
		
		cq.multiselect(
			root.get(Doctor_.id),
			account.get(Account_.name),
			department.get(Department_.name),
			employee.get(Employee_.phone),
			account.get(Account_.email),
			root.get(Doctor_.title),
			root.get(Doctor_.deleted),
			root.get(Doctor_.createdAt),
			root.get(Doctor_.modifiedAt)
		);
		
	}
}
