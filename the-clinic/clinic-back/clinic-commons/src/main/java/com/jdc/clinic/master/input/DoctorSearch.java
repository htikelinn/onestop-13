package com.jdc.clinic.master.input;

import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Employee;
import com.jdc.clinic.domain.master.entity.Department;
import com.jdc.clinic.domain.master.entity.Doctor;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record DoctorSearch(
	Integer departmentId, 
	Boolean deleted,
	String keyword) {

	public Predicate[] where(CriteriaBuilder cb, 
			Root<Doctor> root, 
			Join<Doctor, Employee> employee,
			Join<Employee, Account> account, 
			Join<Doctor, Department> department) {
		
		
		
		return null;
	}

}
