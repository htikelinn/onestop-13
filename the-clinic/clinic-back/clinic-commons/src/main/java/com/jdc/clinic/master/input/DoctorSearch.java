package com.jdc.clinic.master.input;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Account_;
import com.jdc.clinic.domain.master.entity.Department;
import com.jdc.clinic.domain.master.entity.Department_;
import com.jdc.clinic.domain.master.entity.Doctor;
import com.jdc.clinic.domain.master.entity.Doctor_;
import com.jdc.clinic.domain.master.entity.Employee;
import com.jdc.clinic.domain.master.entity.Employee_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record DoctorSearch(
	Integer departmentId, 
	Boolean deleted,
	String keyword) {
	
	public static Builder builder() {
		return new Builder();
	}
	
	public static class Builder {
		private Integer departmentId;
		private Boolean deleted;
		private String keyword;
		
		public DoctorSearch build() {
			return new DoctorSearch(departmentId, deleted, keyword);
		}
		
		public Builder departmentId(Integer departmentId) {
			this.departmentId = departmentId;
			return this;
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

	public Predicate[] where(CriteriaBuilder cb, 
			Root<Doctor> root, 
			Join<Doctor, Employee> employee,
			Join<Employee, Account> account, 
			Join<Doctor, Department> department) {
		
		var params = new ArrayList<>();
		
		if(null != departmentId) {
			params.add(cb.equal(department.get(Department_.id), departmentId));
		}

		if(null != deleted) {
			params.add(cb.equal(root.get(Doctor_.deleted), deleted));
		}
		
		if(StringUtils.hasLength(keyword)) {
			params.add(cb.or(
				cb.like(cb.lower(account.get(Account_.name)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(employee.get(Employee_.phone)), keyword.toLowerCase().concat("%")),
				cb.like(cb.lower(department.get(Department_.name)), keyword.toLowerCase().concat("%"))
			));
		}
		
		return params.toArray(size -> new Predicate[size]);
	}

}
