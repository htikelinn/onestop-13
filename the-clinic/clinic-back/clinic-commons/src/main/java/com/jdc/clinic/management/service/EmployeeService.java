package com.jdc.clinic.management.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.PageResult;
import com.jdc.clinic.domain.auth.entity.Employee;
import com.jdc.clinic.domain.auth.entity.Employee_;
import com.jdc.clinic.domain.auth.repo.EmployeeRepo;
import com.jdc.clinic.management.input.EmployeeForm;
import com.jdc.clinic.management.input.EmployeeSearch;
import com.jdc.clinic.management.output.EmployeeDetails;
import com.jdc.clinic.management.output.EmployeeListItem;
import com.jdc.clinic.utils.ModificationResult;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;

@Service
@Transactional(readOnly = true)
public class EmployeeService {
	
	@Autowired
	private EmployeeRepo employeeRepo;

	public PageResult<EmployeeListItem> search(EmployeeSearch search, int page, int size) {
		return employeeRepo.search(queryFunc(search), countFunc(search), page, size);
	}

	public EmployeeDetails findById(int id) {
		return safeCall(employeeRepo.findById(id).map(EmployeeDetails::from), "employee", "id", id);
	}

	public ModificationResult<Integer> create(EmployeeForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> update(int id, EmployeeForm form) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private Function<CriteriaBuilder, CriteriaQuery<EmployeeListItem>> queryFunc(EmployeeSearch search) {
		return cb -> {
			var cq = cb.createQuery(EmployeeListItem.class);
	
			var root = cq.from(Employee.class);
			EmployeeListItem.select(cq, root);
			
			cq.where(search.where(cb, root));
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(EmployeeSearch search) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
	
			var root = cq.from(Employee.class);
			cq.select(cb.count(root.get(Employee_.id)));
			
			cq.where(search.where(cb, root));
			
			return cq;
		};
	}



}
