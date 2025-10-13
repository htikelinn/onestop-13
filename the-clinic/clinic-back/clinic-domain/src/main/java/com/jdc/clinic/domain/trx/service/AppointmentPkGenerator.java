package com.jdc.clinic.domain.trx.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.TokenSeqPk;
import com.jdc.clinic.domain.trx.entity.TokenSeq;
import com.jdc.clinic.domain.trx.repo.TokenSeqRepo;

@Service
public class AppointmentPkGenerator {
	
	@Autowired
	private TokenSeqRepo repo;

	@Transactional(isolation = Isolation.SERIALIZABLE, propagation = Propagation.REQUIRES_NEW)
	public AppointmentPk next(int doctorId, LocalDate date, String schedule) {
		
		var tokenSeqId = new TokenSeqPk(doctorId, date, schedule);
		
		var seq = repo.findById(tokenSeqId).orElseGet(() -> {
			var entity = new TokenSeq();
			entity.setId(tokenSeqId);
			return repo.save(entity);
		});
		
		return seq.next();
	}
}
