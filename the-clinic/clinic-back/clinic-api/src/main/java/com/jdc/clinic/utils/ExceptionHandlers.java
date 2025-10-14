package com.jdc.clinic.utils;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.jdc.clinic.domain.utils.ClinicBusinessException;

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
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	List<String> handle(Throwable e) {
		log.error("Application Error", e);
		return List.of(e.getMessage());
	}
}
