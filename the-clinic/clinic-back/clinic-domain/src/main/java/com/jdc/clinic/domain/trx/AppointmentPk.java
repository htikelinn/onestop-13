package com.jdc.clinic.domain.trx;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;
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
	private static final DateTimeFormatter INPUT_TIME = DateTimeFormatter.ofPattern("HHmm");
	private static final DateTimeFormatter OUTPUT_TIME = DateTimeFormatter.ofPattern("HH:mm");
	
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
		return "%s%s%03d%04d".formatted(scheduleDate.format(DF), getTime(), doctorId, tokenNumber);
	}
	
	public static AppointmentPk parse(String code) {
		var date = LocalDate.parse(code.substring(0, 8), DF);
		var time = parseScheduleTime(code.substring(8, 16));
		var doctorId = Integer.parseInt(code.substring(16, 19));
		var token = Integer.parseInt(code.substring(19));
		
		return new AppointmentPk(doctorId, date, time, token);
	}
	
	private String getTime() {
		return scheduleTime.replaceAll(":", "").replaceAll(" - ", "");
	}
	
	private static String parseScheduleTime(String str) {
		var timeFrom = LocalTime.parse(str.substring(0, 4), INPUT_TIME);
		var timeTo = LocalTime.parse(str.substring(4), INPUT_TIME);
		return "%s - %s".formatted(timeFrom.format(OUTPUT_TIME), timeTo.format(OUTPUT_TIME));
	}
}
