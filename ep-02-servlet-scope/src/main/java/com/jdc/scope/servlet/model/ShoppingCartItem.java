package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.util.Optional;

import lombok.Data;

@Data
public class ShoppingCartItem implements Serializable{

	private static final long serialVersionUID = 1L;

	private Product product;
	private int quantity;
	
	public int getTotal() {
		return quantity * 
				Optional.ofNullable(product)
					.map(a -> a.price())
					.orElse(0);
	}

	public void plusOne() {
		quantity ++;
	}

	public void removeOne() {
		quantity --;
	}
}
