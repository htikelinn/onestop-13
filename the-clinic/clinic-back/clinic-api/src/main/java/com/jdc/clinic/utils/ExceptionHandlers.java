package com.jdc.clinic.utils;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jdc.clinic.domain.utils.ClinicBusinessException;
import com.jdc.clinic.utils.security.exception.AccessTokenExpirationException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class ExceptionHandlers {

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	List<String> handle(MethodArgumentNotValidException e) {
		return e.getFieldErrors().stream()
				.map(a -> a.getDefaultMessage())
				.toList();
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	List<String> handle(ClinicBusinessException e) {
		return List.of(e.getMessage());
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.GONE)
	List<String> handle(AccessTokenExpirationException e) {
		return List.of(e.getMessage());
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	List<String> handle(AuthenticationException e) {
		return List.of(switch(e) {
		case UsernameNotFoundException _ -> "Please check your login id.";
		case BadCredentialsException _ -> "Please check your password.";
		default -> "Please login again.";
		});
	}
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.FORBIDDEN)
	List<String> handle(AccessDeniedException e) {
		return List.of(e.getMessage());
	}
	
	
	@ExceptionHandler
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	List<String> handle(Throwable e) {
		log.error("Application Error", e);
		return List.of(e.getMessage());
	}
}
