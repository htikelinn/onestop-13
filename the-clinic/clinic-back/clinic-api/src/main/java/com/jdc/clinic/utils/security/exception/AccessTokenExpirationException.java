package com.jdc.clinic.utils.security.exception;

import org.springframework.security.core.AuthenticationException;

public class AccessTokenExpirationException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

	public AccessTokenExpirationException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
