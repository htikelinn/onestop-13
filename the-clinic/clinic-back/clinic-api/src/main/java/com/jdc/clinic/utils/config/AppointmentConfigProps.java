package com.jdc.clinic.utils.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.appointment")
public class AppointmentConfigProps {

	private int maxDays;
}
