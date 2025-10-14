package com.jdc.clinic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.jdc.clinic.domain.auth.entity.Account;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.auth.repo.AccountRepo;

@Configuration
public class ClinicAdminConfiguration {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private AccountRepo accountRepo;
	
	@Value("${app.admin.email}")
	private String adminEmail;
	@Value("${app.admin.password}")
	private String adminPassword;

	@Bean
	@SuppressWarnings("unused")
	ApplicationRunner applicationRunner() {
		return args -> {
			if(accountRepo.count() == 0L) {
				var admin = new Account();
				admin.setName("Administrator");
				admin.setEmail(adminEmail);
				admin.setType(Type.Admin);
				admin.setPassword(passwordEncoder.encode(adminPassword));
				accountRepo.save(admin);
			}
		};
	}
}
