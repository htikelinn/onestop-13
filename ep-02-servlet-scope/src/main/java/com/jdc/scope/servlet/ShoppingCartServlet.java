package com.jdc.scope.servlet;

import java.io.IOException;
import java.util.Optional;

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
	"/cart/checkout",
	"/cart/clear"
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
		
		if("/cart/checkout".equals(req.getServletPath())) {
			getServletContext().getRequestDispatcher("/views/checkout.jsp")
				.forward(req, resp);
			return;
		}
		
		var redirectUrl = switch(req.getServletPath()) {
		case "/cart/add" -> addToCart(req, resp, myCart);
		case "/cart/remove" -> removeFromCart(req, resp, myCart);
		case "/cart/clear" -> Optional.of(myCart).map(a -> a.clear()).map(a -> "/products").get();
		default -> throw new IllegalArgumentException();
		};
		
		resp.sendRedirect(getServletContext().getContextPath().concat(redirectUrl));
	}

	private String removeFromCart(HttpServletRequest req, HttpServletResponse resp, ShoppingCart cart) throws IOException {
		var idStr = req.getParameter("id");
		var id = Integer.parseInt(idStr);
		cart.removeOne(id);
		return cart.getTotalItems() == 0 ? "/products" : "/cart/checkout";
	}

	private String addToCart(HttpServletRequest req, HttpServletResponse resp, ShoppingCart cart) {
		
		var idStr = req.getParameter("id");
		var id = Integer.parseInt(idStr);
		productManager.findById(id).ifPresent(cart::addItem);

		return "1".equals(req.getParameter("home")) ? "/products" : "/cart/checkout";
	}
}
