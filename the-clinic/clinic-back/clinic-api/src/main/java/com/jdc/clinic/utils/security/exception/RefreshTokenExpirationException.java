package com.jdc.clinic.utils.security.exception;

import org.springframework.security.core.AuthenticationException;

public class RefreshTokenExpirationException extends AuthenticationException {

	private static final long serialVersionUID = 1L;

	public RefreshTokenExpirationException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
