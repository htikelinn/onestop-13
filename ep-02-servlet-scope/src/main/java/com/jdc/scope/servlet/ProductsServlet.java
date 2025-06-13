package com.jdc.scope.servlet;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.TreeMap;

import com.jdc.scope.servlet.model.Product;
import com.jdc.scope.servlet.model.ProductManager;

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
	
	private ProductManager productManager;
	
	@Override
	public void init() throws ServletException {
		var path = getServletContext().getRealPath("/WEB-INF/product.txt");
		
		try (var stream  = Files.lines(Path.of(path))) {
			// Load Products
			var products = new TreeMap<Integer, Product>();
			stream
				.map(line -> line.split("\t"))
				.map(array -> new Product(array))
				.forEach(product -> products.put(product.id(), product));
			
			// Create Product Manager
			productManager = new ProductManager(Collections.synchronizedMap(products));
			
			// Add Products to Application Scope (ServletContext)
			getServletContext().setAttribute("productManager", productManager);
			
		} catch (IOException e) {
			System.err.println("File Read Error");
		}
		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		// Get Keyword from Request Params
		var keyword = req.getParameter("keyword");
		
		// Search Result and set to request scope
		req.setAttribute("list", productManager.search(keyword));
		
		getServletContext().getRequestDispatcher("/views/products.jsp")
			.forward(req, resp);
	}

}
