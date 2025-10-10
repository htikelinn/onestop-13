package com.jdc.clinic.domain.trx;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class AppoinementPk implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(nullable = false, name = "doctor_id")
	private int doctorId;
	
	@Column(nullable = false, name = "schedule_date")
	private LocalDate scheduleDate;
	
	@Column(nullable = false, name = "schedule_time")
	private String scheduleTime;

	@Column(nullable = false, name = "token_number")
	private int tokenNumber;
}
