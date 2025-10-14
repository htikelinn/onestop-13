package com.jdc.clinic.utils.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.admin")
public class AdminProperties {

	private String email;
	private String password;
}
