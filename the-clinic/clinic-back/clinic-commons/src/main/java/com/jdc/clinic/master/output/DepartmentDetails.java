package com.jdc.clinic.master.output;

import java.time.LocalDateTime;
import java.util.List;

import com.jdc.clinic.domain.master.entity.Department;

public record DepartmentDetails(
		int id,
		String name,
		String icon,
		String phone,
		String description,
		List<DoctorListItem> doctors,
		boolean deleted,
		LocalDateTime createdAt,
		String createdBy,
		LocalDateTime modifiedAt,
		String modifiedBy) {
	
	public static DepartmentDetails from(Department entity) {
		return new DepartmentDetails(
				entity.getId(), 
				entity.getName(), 
				entity.getIcon(), 
				entity.getPhone(), 
				entity.getDescription(), 
				entity.getDoctors().stream().map(DoctorListItem::from).toList(), 
				entity.isDeleted(), 
				entity.getCreatedAt(), 
				entity.getCreatedBy(), 
				entity.getModifiedAt(), 
				entity.getModifiedBy());
	}

}
