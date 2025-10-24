package com.jdc.clinic.domain.utils;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jdc.clinic.domain.master.Schedule;

import jakarta.persistence.AttributeConverter;

@Component
public class ScheduleConverter implements AttributeConverter<List<Schedule>, String> {

	@Autowired
	private ObjectMapper objectMapper;
	
	@Override
	public String convertToDatabaseColumn(List<Schedule> attribute) {
		
		if(null != attribute && !attribute.isEmpty()) {
			try {
				return objectMapper.writeValueAsString(attribute);
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
		}
		
		return null;
	}

	@Override
	public List<Schedule> convertToEntityAttribute(String dbData) {
		
		if(StringUtils.hasLength(dbData)) {
			try {
				return objectMapper.readValue(dbData, new TypeReference<List<Schedule>>() {});
			} catch (JsonProcessingException e) {
				throw new RuntimeException(e);
			}
		}
		
		return List.of();
	}

}
