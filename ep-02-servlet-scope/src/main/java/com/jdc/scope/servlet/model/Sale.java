package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class Sale implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
	
	private int id;
	private LocalDateTime saleAt;
	private Account account;
	private List<ShoppingCartItem> items = new ArrayList<>();
	
	public int getTotal() {
		return items.stream()
				.mapToInt(a -> a.getTotal())
				.sum();
	}
	
	public int getTotalItems() {
		return items.stream()
				.mapToInt(a -> a.getQuantity())
				.sum();
	}
	
	public String getSaleDateTime() {
		return saleAt.format(DF);
	}
}
