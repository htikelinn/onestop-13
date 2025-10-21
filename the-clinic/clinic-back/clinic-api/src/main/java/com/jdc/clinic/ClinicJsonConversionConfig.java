package com.jdc.clinic;

import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalTimeSerializer;

@Configuration
public class ClinicJsonConversionConfig {

	@Value("${spring.mvc.format.date}")
	private String dateFormat;
	@Value("${spring.mvc.format.time}")
	private String timeFormat;
	@Value("${spring.mvc.format.date-time}")
	private String dateTimeFormat;
	
	@Bean
	Jackson2ObjectMapperBuilderCustomizer jackson2ObjectMapperBuilderCustomizer() {
		return builderCustomizer -> {
			builderCustomizer.serializers(
				new LocalDateSerializer(DateTimeFormatter.ofPattern(dateFormat)),
				new LocalTimeSerializer(DateTimeFormatter.ofPattern(timeFormat)),
				new LocalDateTimeSerializer(DateTimeFormatter.ofPattern(dateTimeFormat))
			);
			
			builderCustomizer.deserializers(
				new LocalDateDeserializer(DateTimeFormatter.ofPattern(dateFormat)),
				new LocalTimeDeserializer(DateTimeFormatter.ofPattern(timeFormat)),
				new LocalDateTimeDeserializer(DateTimeFormatter.ofPattern(dateTimeFormat))
			);			
		};
	}
}
