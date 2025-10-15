package com.jdc.clinic.utils.security.exception;

import org.springframework.security.core.AuthenticationException;

public class InvalidTokenException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

	public InvalidTokenException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
