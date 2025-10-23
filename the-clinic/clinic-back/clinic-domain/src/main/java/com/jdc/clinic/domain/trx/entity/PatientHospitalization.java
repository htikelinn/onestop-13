package com.jdc.clinic.domain.trx.entity;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.master.entity.Patient;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class PatientHospitalization extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	private Patient patient;
	
	@Column(nullable = false)
	private String yearMonth;
	@Column(nullable = false)
	private int admissionDays;
	@Column(nullable = false)
	private String reasonForAdmission;

	private String department;
	private String primaryDiagnosis;
	private String secondaryDiagnosis;
	
}
