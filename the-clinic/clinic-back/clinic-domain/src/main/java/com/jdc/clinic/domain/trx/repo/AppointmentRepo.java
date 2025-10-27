package com.jdc.clinic.domain.trx.repo;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.Query;

import com.jdc.clinic.domain.BaseRepository;
import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.entity.Appointment;

public interface AppointmentRepo extends BaseRepository<Appointment, AppointmentPk>{

	@Query("select count(a) from Appointment a where a.id.scheduleDate = :date and a.id.scheduleTime = :time and a.patientName = :name and a.dob = :dob")
	Long countForApplication(LocalDate date, String time, String name, LocalDate dob);
}
