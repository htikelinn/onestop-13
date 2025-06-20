package com.jdc.scope.servlet;

import java.io.IOException;

import com.jdc.scope.servlet.model.ProductManager;
import com.jdc.scope.servlet.model.ShoppingCart;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet(urlPatterns = {
	"/cart/add",
	"/cart/remove",
	"/cart/checkout"
})
public class ShoppingCartServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private ProductManager productManager;
	
	@Override
	public void init() throws ServletException {
		var object = getServletContext().getAttribute("ProductManager");
		if(object instanceof ProductManager pm) {
			this.productManager = pm;
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		HttpSession session = req.getSession(true);
		
		ShoppingCart myCart = (ShoppingCart) session.getAttribute("myCart");
		if(null == myCart) {
			myCart = new ShoppingCart();
			session.setAttribute("myCart", myCart);
		}
		
		var viewName = switch(req.getServletPath()) {
		case "/cart/add" -> addToCart(req, resp, myCart);
		case "/cart/remove" -> removeFromCart(req, resp, myCart);
		case "/cart/checkout" -> showCheckOutView(req, resp);
		default -> throw new IllegalArgumentException();
		};
		
		if(myCart.getItems().isEmpty()) {
			resp.sendRedirect(getServletContext().getContextPath());
			return;
		} 
		
		getServletContext().getRequestDispatcher(viewName)
			.forward(req, resp);
	}

	private String showCheckOutView(HttpServletRequest req, HttpServletResponse resp) {
		return "/views/checkout.jsp";
	}

	private String removeFromCart(HttpServletRequest req, HttpServletResponse resp, Object myCart) throws IOException {
		if(myCart instanceof ShoppingCart cart) {
			var idStr = req.getParameter("id");
			var id = Integer.parseInt(idStr);
			cart.removeOne(id);
		}
		return "/views/checkout.jsp";
	}

	private String addToCart(HttpServletRequest req, HttpServletResponse resp, Object myCart) {
		
		var idStr = req.getParameter("id");
		var id = Integer.parseInt(idStr);
		
		if(myCart instanceof ShoppingCart cart) {
			productManager.findById(id).ifPresent(cart::addItem);
		}
		
		var fromHome = "1".equals(req.getParameter("home"));
		
		if(fromHome) {
			var keyword = req.getParameter("keyword");
			req.setAttribute("list", productManager.search(keyword));
		}
		
		return fromHome ? "/views/products.jsp" : "/views/checkout.jsp";
	}
}
