package com.jdc.clinic.master.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.auth.entity.Employee;
import com.jdc.clinic.domain.auth.entity.Employee_;
import com.jdc.clinic.domain.auth.repo.AccountRepo;
import com.jdc.clinic.domain.auth.repo.EmployeeRepo;
import com.jdc.clinic.domain.auth.repo.RoleRepo;
import com.jdc.clinic.domain.master.entity.Doctor;
import com.jdc.clinic.domain.master.entity.Doctor_;
import com.jdc.clinic.domain.master.repo.DepartmentRepo;
import com.jdc.clinic.domain.master.repo.DoctorRepo;
import com.jdc.clinic.domain.utils.ClinicBusinessException;
import com.jdc.clinic.master.input.DoctorForm;
import com.jdc.clinic.master.input.DoctorSearch;
import com.jdc.clinic.master.output.DoctorDetails;
import com.jdc.clinic.master.output.DoctorListItem;
import com.jdc.clinic.utils.ModificationResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DoctorService {
	
	private final DoctorRepo doctorRepo;
	private final EmployeeRepo employeeRepo;
	private final AccountRepo accountRepo;
	private final DepartmentRepo departmentRepo;
	private final PasswordEncoder passwordEncoder;
	private final RoleRepo roleRepo;

	public List<DoctorListItem> search(DoctorSearch search) {
		return doctorRepo.search(cb -> {
			var cq = cb.createQuery(DoctorListItem.class);
			var root = cq.from(Doctor.class);
			
			var employee = root.join(Doctor_.employee);
			var account = employee.join(Employee_.account);
			var department = root.join(Doctor_.department);
			
			DoctorListItem.select(cq, root, employee, account, department);
			cq.where(search.where(cb, root, employee, account, department));
			
			return cq;
		});
	}

	public DoctorDetails findById(int id) {
		return safeCall(doctorRepo.findById(id).map(DoctorDetails::from)
				, "doctor", "id", id);
	}

	@Transactional
	public ModificationResult<Integer> create(DoctorForm form) {
		
		if(accountRepo.findById(form.email()).isPresent()) {
			throw new ClinicBusinessException("%s is already used in other account.".formatted(form.email()));
		}
		
		var department = safeCall(departmentRepo.findById(form.departmentId()), 
				"department", "id", form.departmentId());
		
		var role = safeCall(roleRepo.findById(form.roleId()), "role", "id", form.roleId());
		
		var account = new Account();
		account.setEmail(form.email());
		account.setName(form.name());
		account.setType(Type.Employee);
		account.setPassword(passwordEncoder.encode(form.phone()));
		account = accountRepo.save(account);
		
		var employee = new Employee();
		employee.setAccount(account);
		employee.setPhone(form.phone());
		employee.setAssignAt(form.assignAt());
		employee.setRole(role);
		employee = employeeRepo.save(employee);
		
		var doctor = new Doctor();
		doctor.setEmployee(employee);
		doctor.setDepartment(department);
		doctor.setTitle(form.title());
		doctor.setDegree(form.degree());
		
		doctor = doctorRepo.save(doctor);
		
		return new ModificationResult<>(doctor.getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, DoctorForm form) {
		
		var doctor = safeCall(doctorRepo.findById(id), "doctor", "id", id);
		doctor.setTitle(form.title());
		doctor.setDegree(form.degree());
		
		if(doctor.getDepartment().getId() != form.departmentId()) {
			var department = safeCall(departmentRepo.findById(form.departmentId()), 
					"department", "id", form.departmentId());
			doctor.setDepartment(department);
		}
		
		
		var employee = doctor.getEmployee();
		employee.setPhone(form.phone());
		employee.setAssignAt(form.assignAt());

		if(doctor.getEmployee().getRole().getId() != form.roleId()) {
			var role = safeCall(roleRepo.findById(form.roleId()), "role", "id", form.roleId());
			employee.setRole(role);
		}
		
		var account = employee.getAccount();
		if(!account.getEmail().equals(form.email()) 
				&& accountRepo.findById(form.email()).isPresent()) {
			throw new ClinicBusinessException("%s is already used in other account.".formatted(form.email()));
		}
		
		account.setEmail(form.email());
		account.setName(form.name());
		
		return new ModificationResult<>(doctor.getId());
	}

}
