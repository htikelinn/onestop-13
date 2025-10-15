package com.jdc.clinic.domain.auth.repo;

import org.springframework.data.jpa.repository.Query;

import com.jdc.clinic.domain.BaseRepository;
import com.jdc.clinic.domain.auth.entity.Role;

public interface RoleRepo extends BaseRepository<Role, Integer>{

	@Query("select count(r) from Role r where r.name = :name")
	Long countByRoleName(String name);
}
