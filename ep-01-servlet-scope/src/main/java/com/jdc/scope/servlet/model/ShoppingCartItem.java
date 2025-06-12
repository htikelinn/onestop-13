package com.jdc.scope.servlet.model;

import java.io.Serializable;
import java.util.Optional;

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

	public Product getProduct() {
		return product;
	}
	
	public void setProduct(Product product) {
		this.product = product;
	}
	
	public int getQuantity() {
		return quantity;
	}
	
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public void plusOne() {
		quantity ++;
	}

	public void removeOne() {
		quantity --;
	}
}
