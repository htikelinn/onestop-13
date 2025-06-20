package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SaleManager implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Map<String, List<Sale>> sales = Collections.synchronizedMap(new HashMap<>());

	public void add(Sale sale) {
		var loginId = sale.getAccount().getLoginId();
		var list = sales.get(loginId);
		
		if(null == list) {
			list = new ArrayList<>();
			sales.put(loginId, list);
		}
		
		list.add(sale);
	}
	
	public List<Sale> search(String loginId) {
		return sales.get(loginId);
	}
}
