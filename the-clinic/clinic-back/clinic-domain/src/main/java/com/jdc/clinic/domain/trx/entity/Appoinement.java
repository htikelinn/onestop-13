package com.jdc.clinic.domain.trx.entity;

import java.time.LocalDate;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.master.entity.Doctor;
import com.jdc.clinic.domain.trx.AppoinementPk;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Appoinement extends BaseEntity{
	
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private AppoinementPk id;
	
	@ManyToOne(optional = false)
	@JoinColumn(insertable = false, updatable = false)
	private Doctor doctor;
	
	@Column(nullable = false)
	private Status status;
	
	@Column(nullable = false)
	private String patientName;
	
	@Column(nullable = false)
	private LocalDate dob;
	
	@Column(nullable = false)
	private String phone;

	@Column(nullable = false)
	private String chiefComplaint;
	
	
	public enum Status {
		Applied, CheckIn {
			@Override
			public String getViewName() {
				return "Check In";
			}
		}, Investigated, Treatmented, CheckOut {
			@Override
			public String getViewName() {
				return "Check Out";
			}
		}, Canceled, Expired;
		
		public String getViewName() {
			return name();
		}
	}

}
