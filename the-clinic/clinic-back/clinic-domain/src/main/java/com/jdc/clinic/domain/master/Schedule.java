package com.jdc.clinic.domain.master;

import java.io.Serializable;
import java.time.DayOfWeek;

public record Schedule(
		DayOfWeek day,
		String start,
		String end) implements Serializable {

}
