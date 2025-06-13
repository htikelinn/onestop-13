package com.jdc.scope.servlet.model;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ProductManager {

	private final Map<Integer, Product> products;
	
	public List<Product> search(String keyword) {
		return products.values()
				.stream()
				.filter(product -> isMatch(product, keyword))
				.toList();
	}
	
	private boolean isMatch(Product product, String keyword) {
		
		if(null != keyword && !keyword.isBlank()) {
			return product.name().toLowerCase().startsWith(keyword.toLowerCase()) 
					|| product.category().toLowerCase().startsWith(keyword.toLowerCase());
		}
		
		return true;
	}

	public Optional<Product> findById(int id) {
		return Optional.ofNullable(products.get(id));
	}
}
