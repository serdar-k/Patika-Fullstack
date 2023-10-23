package com.serdar.regapp.error;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import lombok.Data;

@Data
public class ApiError {

	private int status;
	
	private String message;
	
	private String path;
	
	private long timestamp = new Date().getTime();
	
	private Map<String, String> validationErrors = new HashMap<>();
	
}
