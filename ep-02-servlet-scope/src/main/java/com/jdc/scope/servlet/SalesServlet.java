package com.jdc.scope.servlet;

import java.io.IOException;

import com.jdc.scope.servlet.model.Account;
import com.jdc.scope.servlet.model.SaleManager;
import com.jdc.scope.servlet.model.ShoppingCart;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/sales")
public class SalesServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private SaleManager saleManager;
	
	@Override
	public void init() throws ServletException {
		saleManager = (SaleManager) getServletContext().getAttribute("SaleManager");
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		var idStr = req.getParameter("id");
		
		if(null != idStr && !idStr.isEmpty()) {
			req.setAttribute("sale", saleManager.findById(Integer.parseInt(idStr)));
			getServletContext().getRequestDispatcher("/views/sale-details.jsp")
				.forward(req, resp);
			
			return;
		}
 		
		var session = req.getSession(true);
		Account account = (Account) session.getAttribute("loginUser");
		
		var list = saleManager.search(account.getEmail());
		req.setAttribute("list", list);
		
		getServletContext().getRequestDispatcher("/views/sale-list.jsp")
			.forward(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		var session = req.getSession(true);
		ShoppingCart cart = (ShoppingCart) session.getAttribute("myCart");
		Account account = (Account) session.getAttribute("loginUser");
		
		var id = saleManager.add(cart, account);
		
		resp.sendRedirect(getServletContext().getContextPath().concat("/sales?id=%s".formatted(id)));
	}
}
