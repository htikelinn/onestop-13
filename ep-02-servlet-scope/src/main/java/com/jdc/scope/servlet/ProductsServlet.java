package com.jdc.scope.servlet;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.TreeMap;

import com.jdc.scope.servlet.model.Product;

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
		var path = getServletContext().getRealPath("/WEB-INF/product.txt");
		
		try (var stream  = Files.lines(Path.of(path))) {
			// Load Products
			var products = new TreeMap<Integer, Product>();
			stream
				.map(line -> line.split("\t"))
				.map(array -> new Product(array))
				.forEach(product -> products.put(product.id(), product));
		
			// Add Products to Application Scope (ServletContext)
			getServletContext().setAttribute("productMap", products);
		} catch (IOException e) {
			System.err.println("File Read Error");
		}
		
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		var keyword = req.getParameter("keyword");
		@SuppressWarnings("unchecked")
		Map<Integer, Product> productMap = (Map<Integer, Product>) getServletContext().getAttribute("productMap");
		
		var products = productMap.values().stream()
			.filter(a -> {
				
				if(null != keyword && !keyword.isBlank()) {
					return a.category().toLowerCase().startsWith(keyword.toLowerCase()) 
							|| a.name().toLowerCase().startsWith(keyword.toLowerCase());
				}
				
				return true;
			}).toList();
		
		req.setAttribute("products", products);
		
		getServletContext().getRequestDispatcher("/views/products.jsp")
			.forward(req, resp);
	}

}
