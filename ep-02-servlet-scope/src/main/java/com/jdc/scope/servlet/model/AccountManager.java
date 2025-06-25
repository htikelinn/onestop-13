package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.jdc.scope.servlet.model.exception.BusinessException;

public class AccountManager implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Map<String, Account> accounts = Collections.synchronizedMap(new HashMap<>());

	public void add(Account account) {
		if(accounts.containsKey(account.getEmail())) {
			throw new BusinessException("Your login id is already used. Please use other login id.");
		}
		
		accounts.put(account.getEmail(), account);
	}
	
	public Account get(String loginId) {
		return accounts.get(loginId);
	}
	
}
