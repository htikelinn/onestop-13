package com.jdc.scope.servlet;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(urlPatterns = {
	"/",
	"/products"
}, loadOnStartup = 1)
public class ProductsServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;
	
	@Override
	public void init() throws ServletException {
		// Load Products
		
		// Add Products to Application Scope (ServletContext)
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		
	}

}
