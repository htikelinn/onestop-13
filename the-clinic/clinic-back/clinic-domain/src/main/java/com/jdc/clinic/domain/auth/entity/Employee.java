package com.jdc.clinic.domain.auth.entity;

import java.time.LocalDate;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.auth.entity.Account.Type;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Employee extends BaseEntity{

	private static final long serialVersionUID = 1L;
	
	public Employee() {
		account = new Account();
		account.setType(Type.Employee);
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, optional = false)
	private Account account;
	
	@ManyToOne(optional = false)
	private Role role;
	
	private String phone;
	private LocalDate assignAt;
	private LocalDate retiredAt;
	
}
