package com.jdc.clinic.domain.trx;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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
	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyyMMdd");
	
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

	public String getCode() {
		return "%s-%s-%03d-%04d".formatted(scheduleDate.format(DF), scheduleTime, doctorId, tokenNumber);
	}
	
	public static AppointmentPk parse(String code) {
		var array = code.split("-");
		return new AppointmentPk(Integer.parseInt(array[2]), 
				LocalDate.parse(array[0]), 
				array[1], 
				Integer.parseInt(array[3]));
	}
}
