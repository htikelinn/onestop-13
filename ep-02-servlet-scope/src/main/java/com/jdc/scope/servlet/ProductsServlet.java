package com.jdc.scope.servlet;

import java.io.IOException;

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
		var storage = getServletContext().getAttribute("ProductManager");
		
		if(storage instanceof ProductManager pm) {
			this.productManager = pm;
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
