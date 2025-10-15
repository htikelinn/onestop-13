package com.jdc.clinic.domain.auth.entity;

import java.time.LocalDate;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.auth.Address;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.utils.StringArrayConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Patient extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	public Patient() {
		this.account = new Account();
		account.setType(Type.Patient);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
	private Account account;

	private String phone;
	private LocalDate dob;
	private String nrcNumber;
	private String occupation;
	
	private Gender gender;
	private BloodGroup bloodType;
	
	private Address address;
	
	@Column(columnDefinition = "TEXT")
	@Convert(converter = StringArrayConverter.class)
	private String [] allergics;
	
	public enum BloodGroup {
		
	}
	
	public enum Gender {
		Male, Female
	}
	
}
