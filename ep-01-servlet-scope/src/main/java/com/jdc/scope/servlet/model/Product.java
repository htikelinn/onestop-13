package com.jdc.scope.servlet.model;

import java.io.Serializable;

public record Product(
		int id,
		String category,
		String name, 
		int price) implements Serializable{

	public Product(String [] array) {
		this(
			Integer.parseInt(array[0]), 
			array[1], 
			array[2],
			Integer.parseInt(array[3]));
	}
}
