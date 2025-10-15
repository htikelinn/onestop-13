package com.jdc.clinic.domain.utils;

import jakarta.persistence.AttributeConverter;

public class StringArrayConverter implements AttributeConverter<String[], String>{

	@Override
	public String convertToDatabaseColumn(String[] attribute) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String[] convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		return null;
	}

}
