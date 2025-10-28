package com.jdc.clinic.tx.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.PageResult;
import com.jdc.clinic.domain.trx.AppointmentPk;
import com.jdc.clinic.domain.trx.AppointmentPk_;
import com.jdc.clinic.domain.trx.entity.Appointment;
import com.jdc.clinic.domain.trx.entity.Appointment_;
import com.jdc.clinic.domain.trx.repo.AppointmentRepo;
import com.jdc.clinic.tx.input.AppointmentFormPublic;
import com.jdc.clinic.tx.input.AppointmentSearch;
import com.jdc.clinic.tx.output.AppointmentDetails;
import com.jdc.clinic.tx.output.AppointmentListItem;
import com.jdc.clinic.utils.ModificationResult;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class StaffAppointmentService {
	
	private final AppointmentRepo appointmentRepo;

	public AppointmentDetails findById(String code) {
		return safeCall(appointmentRepo.findById(AppointmentPk.parse(code)).map(AppointmentDetails::from), 
				"Appointment", "id", code);
	}

	public PageResult<AppointmentListItem> search(AppointmentSearch search, int page, int size) {
		
		Function<CriteriaBuilder, CriteriaQuery<AppointmentListItem>> queryFunc = cb -> {
			var cq = cb.createQuery(AppointmentListItem.class);
			var root = cq.from(Appointment.class);
			AppointmentListItem.select(cq, root);
			cq.where(search.where(cb, root));
			var id = root.get(Appointment_.id);
			cq.orderBy(
				cb.desc(id.get(AppointmentPk_.scheduleDate)),
				cb.desc(id.get(AppointmentPk_.scheduleTime))
			);
			return cq;
		};
		
		Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc = cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Appointment.class);
			cq.select(cb.count(root.get(Appointment_.id)));
			cq.where(search.where(cb, root));
			return cq;
		};

		return appointmentRepo.search(queryFunc, countFunc, page, size);
	}

	@Transactional
	public ModificationResult<String> create(AppointmentFormPublic form) {
		// TODO Auto-generated method stub
		return null;
	}


}
