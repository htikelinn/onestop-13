package com.jdc.clinic.anonymous.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.master.repo.DoctorRepo;
import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.repo.AppointmentRepo;
import com.jdc.clinic.domain.trx.service.AppointmentPkGenerator;
import com.jdc.clinic.domain.utils.ClinicBusinessException;
import com.jdc.clinic.tx.input.PublicAppointmentForm;
import com.jdc.clinic.tx.output.PublicAppointmentResult;
import com.jdc.clinic.utils.ModificationResult;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PublicAppointmentService {
	
	private final AppointmentRepo appointmentRepo;
	private final DoctorRepo doctorRepo;
	private final AppointmentPkGenerator idGenerator;
	
	@Transactional
	public ModificationResult<String> create(PublicAppointmentForm form) {
		
		if(appointmentRepo.countForApplication(form.scheduleDate(), form.scheduleTime(), form.patientName(), form.dateOfBirth()) > 0) {
			throw new ClinicBusinessException("You already take an appointment for %s %s.".formatted(form.scheduleDate(), form.scheduleTime()));
		}
		
		var doctor = safeCall(doctorRepo.findById(form.doctorId()), "doctor", "id", form.doctorId());
		var id = idGenerator.next(form.doctorId(), form.scheduleDate(), form.scheduleTime());
		
		var entity = appointmentRepo.save(form.entity(doctor, id));
		
		return new ModificationResult<String>(entity.getId().getCode());
	}

	@Transactional(readOnly = true)
	public PublicAppointmentResult findById(String code) {
		var id = AppointmentPk.parse(code);
		var entity = safeCall(appointmentRepo.findById(id), "appointment", "code", code);
		return PublicAppointmentResult.from(entity);
	}

}
