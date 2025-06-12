package com.jdc.scope.servlet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;

@WebServlet(urlPatterns = {
	"/cart/add",
	"/cart/show",
	"/cart/checkout"
})
public class ShoppingCartServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

}
