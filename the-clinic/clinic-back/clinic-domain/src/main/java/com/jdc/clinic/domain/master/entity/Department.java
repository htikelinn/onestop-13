package com.jdc.clinic.domain.master.entity;

import java.util.List;

import com.jdc.clinic.domain.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Department extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false, unique = true)
	private String name;

	@Column(nullable = false)
	private String icon;
	
	@Column(nullable = false)
	private String phone;
	
	@Column(nullable = false, columnDefinition = "TEXT")
	private String description;
	
	@OneToMany(mappedBy = "department")
	private List<Doctor> doctors;
}
