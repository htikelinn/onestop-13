package com.jdc.clinic.domain;

import java.util.ArrayList;
import java.util.List;

public record PageResult<T>(
		List<T> list,
		Long totalRows,
		int page,
		int size) {

	public int getTotalPages() {
		var rem = totalRows.intValue() % size;
		var pages = totalRows.intValue() / size;
		return rem > 0 ? pages + 1 : pages;
	}
	
	public List<Integer> getLinks() {
		
		var links = new ArrayList<Integer>();
		links.add(page);
		var pages = getTotalPages();
		
		while(links.size() < 3 && links.getFirst() > 0) {
			links.addFirst(links.getFirst() - 1);
		}
		
		while(links.size() < 5 && links.getLast() < pages - 1) {
			links.add(links.getLast() + 1);
		}
		
		while(links.size() < 5 && links.getFirst() > 0) {
			links.addFirst(links.getFirst() - 1);
		}
		
		return links;
	}
}
