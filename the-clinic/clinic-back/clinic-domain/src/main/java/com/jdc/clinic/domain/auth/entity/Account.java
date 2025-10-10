package com.jdc.clinic.domain.auth.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Account implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id
	private String email;
	
	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private String password;
	
	@Column(nullable = false)
	private Type type;
	
	public enum Type {
		Admin, Patient, Employee
	}
}
