package dev.louiiuol.etin.api.controllers;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import dev.louiiuol.etin.api.errors.ApiErrorsDto;
import dev.louiiuol.etin.api.errors.MessageNotReadableError;
import dev.louiiuol.etin.api.errors.ResourceNotFoundError;
import dev.louiiuol.etin.api.errors.ValidationError;

import dev.louiiuol.etin.api.exceptions.ResourceNotFoundException;

/**
 * This class exposes a {@code RestControllerAdvice} that
 * extends {@code ResponseEntityExceptionHandler} to
 * handle exceptions occuring in the API
 * 
 * @see RestControllerAdvice
 * @see ExceptionHandler
 * @see WebRequest
 */
@RestControllerAdvice
public abstract class ControllerAdvice extends ResponseEntityExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ControllerAdvice.class);

	protected ControllerAdvice() {}

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
		
		// Intercept field validation errors
		List<FieldError> fieldErrors = ex.getBindingResult().getFieldErrors();
		List<ValidationError> errors = new ArrayList<>(fieldErrors.size());
		ValidationError error = null;
		for (FieldError fieldError : fieldErrors) {
			String entityName = fieldError.getObjectName();
			String fieldName = fieldError.getField();
			String errorCode = fieldError.getDefaultMessage();
			error = ValidationError.ofFieldType(entityName, fieldName, errorCode);
			errors.add(error);
		}
		
		// Intercept global errors such as multi-fields errors
		List<ObjectError> globalErrors = ex.getBindingResult().getGlobalErrors();
		for (ObjectError globalError : globalErrors) {
			String entityName = globalError.getObjectName();
			String fieldName = globalError.getCode();
			String errorCode = globalError.getDefaultMessage();
			error = ValidationError.ofGlobalType(entityName, fieldName, errorCode);
			errors.add(error);
		}

		// Wrap Errors in response dto
		ApiErrorsDto<ValidationError> apiErrors = new ApiErrorsDto<>(errors, status.value(), getRequestURI());
		LOGGER.error("ARGUMENT NOT VALID: "  + apiErrors.toString());
		return new ResponseEntity<>(apiErrors, status);
	}

    @Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable( HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {	
		// Intercept not readable messages including conversion errors
		List<MessageNotReadableError> errors = new ArrayList<>();
		errors.add(new MessageNotReadableError(ex.getMessage()));
		ApiErrorsDto<MessageNotReadableError> apiErrors = new ApiErrorsDto<>(errors,
			status.value(), getRequestURI());
		LOGGER.error("MESSAGE NOT READABLE: "  + apiErrors.toString());
		return new ResponseEntity<>(apiErrors, status);
    }

    @Override
	protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
		// Intercept any internal exceptions
		LOGGER.error("INTERNAL SERVER ERROR: " + ex.getMessage() );
		return super.handleExceptionInternal(ex, body, headers, status, request);
    }

    protected static String getRequestURI() { 
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		return attr.getRequest().getRequestURI();
	}

	@ExceptionHandler(value= ResourceNotFoundException.class)
	protected ResponseEntity<Object> handleResourceNotFoundException(Exception exception) {
		List<ResourceNotFoundError> errors = new ArrayList<>();
		errors.add(new ResourceNotFoundError());
		ApiErrorsDto<ResourceNotFoundError> apiErrors = new ApiErrorsDto<>(errors, HttpStatus.CONFLICT.value(), getRequestURI());
		return new ResponseEntity<>(apiErrors, HttpStatus.NOT_FOUND);
	}

}