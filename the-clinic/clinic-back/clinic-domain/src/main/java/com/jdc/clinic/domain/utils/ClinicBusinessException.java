package com.jdc.clinic.domain.utils;

public class ClinicBusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ClinicBusinessException(String message, Throwable cause) {
		super(message, cause);
	}

	public ClinicBusinessException(String message) {
		super(message);
	}

	public ClinicBusinessException(Throwable cause) {
		super(cause);
	}

}
