package com.jdc.clinic.management.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.function.Function;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.PageResult;
import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.auth.repo.AccountRepo;
import com.jdc.clinic.domain.auth.repo.RoleRepo;
import com.jdc.clinic.domain.master.entity.Employee;
import com.jdc.clinic.domain.master.entity.Employee_;
import com.jdc.clinic.domain.master.repo.EmployeeRepo;
import com.jdc.clinic.domain.utils.ClinicBusinessException;
import com.jdc.clinic.management.input.EmployeeForm;
import com.jdc.clinic.management.input.EmployeeSearch;
import com.jdc.clinic.management.output.EmployeeDetails;
import com.jdc.clinic.management.output.EmployeeListItem;
import com.jdc.clinic.utils.ModificationResult;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EmployeeService {
	
	private final EmployeeRepo employeeRepo;
	private final AccountRepo accountRepo;
	private final RoleRepo roleRepo;
	private final PasswordEncoder passwordEncoder;
	
	public PageResult<EmployeeListItem> search(EmployeeSearch search, int page, int size) {
		return employeeRepo.search(queryFunc(search), countFunc(search), page, size);
	}

	public EmployeeDetails findById(int id) {
		return safeCall(employeeRepo.findById(id).map(EmployeeDetails::from), "employee", "id", id);
	}

	@Transactional
	public ModificationResult<Integer> create(EmployeeForm form) {
		
		if(accountRepo.findById(form.email()).isPresent()) {
			throw new ClinicBusinessException("%s is already used by other account.".formatted(form.email()));
		}
		
		var role = safeCall(roleRepo.findById(form.roleId()), "role", "id", form.roleId());
		
		var account = new Account();
		account.setName(form.name());
		account.setEmail(form.email());
		account.setType(Type.Employee);
		account.setPassword(passwordEncoder.encode(form.phone()));
		
		account = accountRepo.save(account);
		
		var employee = new Employee();
		employee.setAccount(account);
		employee.setRole(role);
		employee.setPhone(form.phone());
		employee.setAssignAt(form.assignAt());
		employee.setRetiredAt(form.retiredAt());
		
		employee = employeeRepo.save(employee);
		
		return new ModificationResult<Integer>(employee.getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, EmployeeForm form) {
		
		var role = safeCall(roleRepo.findById(form.roleId()), "role", "id", form.roleId());
		var employee = safeCall(employeeRepo.findById(id), "employee", "id", id);
		
		if(!employee.getAccount().getEmail().equals(form.email()) 
				&& accountRepo.findById(form.email()).isPresent()) {
			throw new ClinicBusinessException("%s is already used by other account.".formatted(form.email()));
		}
		
		employee.setRole(role);
		employee.setPhone(form.phone());
		employee.setAssignAt(form.assignAt());
		employee.setRetiredAt(form.retiredAt());

		var account = employee.getAccount();
		account.setName(form.name());
		account.setEmail(form.email());
		
		return new ModificationResult<Integer>(employee.getId());
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
