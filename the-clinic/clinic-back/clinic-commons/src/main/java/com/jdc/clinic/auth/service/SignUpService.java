package com.jdc.clinic.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.auth.input.SignUpForm;
import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.auth.entity.Patient;
import com.jdc.clinic.domain.auth.repo.AccountRepo;
import com.jdc.clinic.domain.auth.repo.PatientRepo;
import com.jdc.clinic.domain.utils.ClinicBusinessException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignUpService {
	
	private final AccountRepo accountRepo;
	private final PatientRepo patientRepo;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public Account signUp(SignUpForm form) {
		
		if(accountRepo.findById(form.email()).isPresent()) {
			throw new ClinicBusinessException("Your email has been used in other patient.");
		}
		
		var account = new Account();
		account.setName(form.name());
		account.setEmail(form.email());
		account.setPassword(passwordEncoder.encode(form.password()));
		account.setType(Type.Patient);
		
		var patient = new Patient();
		patient.setAccount(account);
		
		patient = patientRepo.save(patient);
		
		return patient.getAccount();
	}

}
