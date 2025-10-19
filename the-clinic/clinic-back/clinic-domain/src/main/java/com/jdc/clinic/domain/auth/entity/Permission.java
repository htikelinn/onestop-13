package com.jdc.clinic.domain.auth.entity;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.auth.PermissionPk;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Permission extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private PermissionPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "role_id", insertable = false, updatable = false)
	private Role role;
	
	@ManyToOne(optional = false)
	@JoinColumn(name = "feature_id", insertable = false, updatable = false)
	private Feature feature;
	
	private Type permission;
	
	public enum Type {
		Read, Write, Modify, Delete
	}
	
	public boolean isAvailable() {
		return null != permission;
	}
}
