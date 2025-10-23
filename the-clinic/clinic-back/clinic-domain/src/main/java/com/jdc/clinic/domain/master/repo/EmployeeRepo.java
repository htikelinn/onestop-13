package com.jdc.clinic.domain.master.repo;

import java.util.Optional;

import com.jdc.clinic.domain.BaseRepository;
import com.jdc.clinic.domain.master.entity.Employee;

public interface EmployeeRepo extends BaseRepository<Employee, Integer>{

	Optional<Employee> findOneByAccountEmail(String email);

}
