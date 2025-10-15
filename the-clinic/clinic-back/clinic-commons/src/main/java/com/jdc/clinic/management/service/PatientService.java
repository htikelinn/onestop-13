package com.jdc.clinic.management.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.PageResult;
import com.jdc.clinic.management.input.PatientForm;
import com.jdc.clinic.management.input.PatientSearch;
import com.jdc.clinic.management.output.PatientDetails;
import com.jdc.clinic.management.output.PatientListItem;
import com.jdc.clinic.utils.ModificationResult;

@Service
@Transactional(readOnly = true)
public class PatientService {

	public PageResult<PatientListItem> search(PatientSearch search, int page, int size) {
		// TODO Auto-generated method stub
		return null;
	}

	public PatientDetails findById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> create(PatientForm form) {
		// TODO Auto-generated method stub
		return null;
	}

	public ModificationResult<Integer> update(int id, PatientForm form) {
		// TODO Auto-generated method stub
		return null;
	}

}
