package com.jdc.clinic.anonymous.service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.anonymous.output.PublicSchedule;
import com.jdc.clinic.domain.master.Schedule;
import com.jdc.clinic.domain.trx.TokenSeqPk;
import com.jdc.clinic.domain.trx.repo.TokenSeqRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicScheduleService {
	
	@Value("${app.appointment.max-days}")
	private int scheduleMaxDays;
	
	private final TokenSeqRepo tokenSeqRepo;

	@Transactional(readOnly = true)
	public List<PublicSchedule> getSchedules(int doctorId, List<Schedule> schedules) {
		
		var result = new ArrayList<PublicSchedule>();
		var currentDate = LocalDate.now();
		var maxDate = currentDate.plusDays(scheduleMaxDays);
		
		Map<String, List<Schedule>> scheduleMap = schedules.stream().collect(Collectors.groupingBy(Schedule::day));
		
		while(currentDate.compareTo(maxDate) <= 0) {
			
			var day = currentDate.getDayOfWeek()
					.getDisplayName(TextStyle.FULL, Locale.getDefault());
			
			if(scheduleMap.keySet().contains(day)) {
				
				for(var schedule : scheduleMap.get(day)) {
					
					var scheduleTime = "%s - %s".formatted(schedule.start(), schedule.end());
					
					var pk = new TokenSeqPk(doctorId, currentDate, scheduleTime);
					
					var tokenNumber = tokenSeqRepo.findById(pk)
							.map(a -> a.getTokenNumber())
							.orElse(0);
					
					result.add(new PublicSchedule(currentDate, scheduleTime, tokenNumber));
				}
			}
			
			currentDate = currentDate.plusDays(1);
		}
		
		return result;
	}

}
