package com.jdc.clinic.domain.auth.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Feature implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id
	private String path;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String category;
	
	@Column(nullable = false)
	private String icon;

}
