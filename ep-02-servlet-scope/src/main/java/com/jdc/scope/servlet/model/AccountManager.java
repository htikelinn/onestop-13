package com.jdc.scope.servlet.model;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.jdc.scope.servlet.model.exception.BusinessException;

public class AccountManager {

	private Map<String, Account> accounts = Collections.synchronizedMap(new HashMap<>());

	public void add(Account account) {
		if(accounts.containsKey(account.getLoginId())) {
			throw new BusinessException("Your login id is already used. Please use other login id.");
		}
		
		accounts.put(account.getLoginId(), account);
	}
	
	public Account get(String loginId) {
		return accounts.get(loginId);
	}
	
}
