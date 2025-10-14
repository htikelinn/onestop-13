package com.jdc.clinic.utils.props;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.token")
public class JwtTokenProperties {

	private String issuer;
	private int access;
	private int refresh;
}
