package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SaleManager implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int saleId;
	
	private Map<String, List<Sale>> sales = Collections.synchronizedMap(new HashMap<>());

	public int add(ShoppingCart cart, Account account) {
		
		var sale = new Sale();

		sale.setId(++saleId);
		sale.setAccount(account);
		sale.setItems(cart.getItems());
		sale.setSaleAt(LocalDateTime.now());
		
		var list = sales.get(account.getEmail());
		
		if(null == list) {
			list = new ArrayList<>();
			sales.put(account.getEmail(), list);
		}
		
		list.add(sale);
		
		cart.clear();
		
		return saleId;
	}
	
	public Sale findById(int id) {
		return sales.values().stream().flatMap(a -> a.stream())
				.filter(a -> a.getId() == id)
				.findFirst().orElse(null);
	}
	
	public List<Sale> search(String loginId) {
		return sales.get(loginId);
	}
}
