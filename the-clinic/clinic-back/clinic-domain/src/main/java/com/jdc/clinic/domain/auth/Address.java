package com.jdc.clinic.domain.auth;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Address implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String building;
	private String address;
	private String quarter;
	private String township;
	private String region;
}
