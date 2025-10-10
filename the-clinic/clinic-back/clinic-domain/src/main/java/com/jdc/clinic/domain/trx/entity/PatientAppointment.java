package com.jdc.clinic.domain.trx.entity;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.auth.entity.Patient;
import com.jdc.clinic.domain.trx.PatientAppointmentPk;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class PatientAppointment extends BaseEntity {
	
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private PatientAppointmentPk id;
	
	@ManyToOne
	@JoinColumn(name = "patient_id", referencedColumnName = "id", insertable = false, updatable =  false)
	private Patient patient;
	
	@OneToOne
	@JoinColumn(name = "doctor_id", referencedColumnName = "doctor_id", insertable = false, updatable = false)
	@JoinColumn(name = "schedule_date", referencedColumnName = "schedule_date", insertable = false, updatable = false)
	@JoinColumn(name = "schedule_time", referencedColumnName = "schedule_time", insertable = false, updatable = false)
	@JoinColumn(name = "token_number", referencedColumnName = "token_number", insertable = false, updatable = false)
	private Appoinement appoinement;
}
