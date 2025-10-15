package com.jdc.clinic.domain.master.repo;

import org.springframework.data.jpa.repository.Query;

import com.jdc.clinic.domain.BaseRepository;
import com.jdc.clinic.domain.master.entity.Department;

public interface DepartmentRepo extends BaseRepository<Department, Integer>{

	@Query("select count(d.id) from Department d where d.name = :name")
	Long countByName(String name);
}
