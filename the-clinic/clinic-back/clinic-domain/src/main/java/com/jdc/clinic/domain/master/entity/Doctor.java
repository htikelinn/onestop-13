package com.jdc.clinic.domain.master.entity;

import java.util.List;

import com.jdc.clinic.domain.BaseEntity;
import com.jdc.clinic.domain.master.Schedule;
import com.jdc.clinic.domain.utils.ScheduleConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@EqualsAndHashCode(callSuper = false)
public class Doctor extends BaseEntity {
	
	private static final long serialVersionUID = 1L;

	@Id
	private int id;
	
	@MapsId
	@OneToOne(optional = false)
	private Employee employee;
	
	@ManyToOne
	private Department department;
	
	@Column(nullable = false)
	private String degree;

	@Column(nullable = false)
	private String title;
	
	@Column(columnDefinition = "TEXT")
	@Convert(converter = ScheduleConverter.class)
	private List<Schedule> schedules;
}
