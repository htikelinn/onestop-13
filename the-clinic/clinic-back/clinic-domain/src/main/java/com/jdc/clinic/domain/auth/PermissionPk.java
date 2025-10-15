package com.jdc.clinic.domain.auth;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class PermissionPk implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(nullable = false, name = "role_id")
	private int roleId;
	
	@Column(nullable = false, name = "feature_id")
	private String featureId;

}
