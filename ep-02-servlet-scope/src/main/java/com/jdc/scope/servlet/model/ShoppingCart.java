package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ShoppingCart implements Serializable{

	private static final long serialVersionUID = 1L;

	private Map<Integer, ShoppingCartItem> items = new LinkedHashMap<>();
	
	public void addItem(Product product) {
		var item = items.get(product.id());
		
		if(null == item) {
			item = new ShoppingCartItem();
			item.setProduct(product);
			items.put(product.id(), item);
		}
		
		item.plusOne();
	}
	
	public void removeOne(int id) {
		var item = items.get(id);
		
		if(null != item) {
			item.removeOne();
			
			if(item.getQuantity() == 0) {
				items.remove(id);
			}
		}
	}
	
	public boolean clear() {
		items.clear();
		return items.isEmpty();
	}
	
	public List<ShoppingCartItem> getItems() {
		return new ArrayList<>(items.values());
	}
	
	public int getTotalItems() {
		return items.values().stream()
				.mapToInt(a -> a.getQuantity())
				.sum();
	}
	
	public int getTotalAmount() {
		return items.values().stream()
				.mapToInt(a -> a.getTotal())
				.sum();
	}
}
