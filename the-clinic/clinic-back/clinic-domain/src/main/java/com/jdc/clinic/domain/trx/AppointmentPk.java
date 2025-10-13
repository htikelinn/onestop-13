package com.jdc.clinic.domain.trx;

import java.io.Serializable;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentPk implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Column(nullable = false, name = "doctor_id")
	private int doctorId;
	
	@Column(nullable = false, name = "schedule_date")
	private LocalDate scheduleDate;
	
	@Column(nullable = false, name = "schedule_time")
	private String scheduleTime;

	@Column(nullable = false, name = "token_number")
	private int tokenNumber;

	public static AppointmentPk from(TokenSeqPk id, int tokenNumber) {
		return new AppointmentPk(id.getDoctorId(), 
				id.getScheduleDate(), 
				id.getScheduleTime(), 
				tokenNumber);
	}
}
