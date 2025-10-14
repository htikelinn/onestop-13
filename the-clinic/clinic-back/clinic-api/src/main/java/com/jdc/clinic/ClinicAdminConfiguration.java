package com.jdc.clinic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.repo.AccountRepo;

@Configuration
public class ClinicAdminConfiguration {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AccountRepo accountRepo;

	@Bean
	@SuppressWarnings("unused")
	ApplicationRunner applicationRunner() {
		return args -> {
			if(accountRepo.count() == 0L) {
				var admin = new Account();
				admin.setName("Administrator");
				admin.setEmail("admin@theclinic.com");
				admin.setPassword(passwordEncoder.encode("admin@123"));
				accountRepo.save(admin);
			}
		};
	}
}
