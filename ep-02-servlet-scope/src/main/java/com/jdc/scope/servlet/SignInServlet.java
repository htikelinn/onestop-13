package com.jdc.scope.servlet;

import java.io.IOException;

import com.jdc.scope.servlet.model.AccountManager;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/signin")
public class SignInServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private AccountManager accountManager;
	
	@Override
	public void init() throws ServletException {
		accountManager = (AccountManager) getServletContext().getAttribute("AccountManager");
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		getServletContext().getRequestDispatcher("/views/sign-in.jsp")
			.forward(req, resp);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		var email = req.getParameter("email");
		var password = req.getParameter("password");
		
		var account = accountManager.get(email);
		
		String message = null;
		
		if(null == account) {
			message = "Please check your login id.";
		} else {
			if(!password.equals(account.getPassword())) {
				message = "Please check your password.";
			}
		}
		
		if(null != message) {
			req.setAttribute("message", message);
			getServletContext().getRequestDispatcher("/views/sign-in.jsp").forward(req, resp);
			return;
		}
		
		var session = req.getSession(true);
		session.setAttribute("LOGIN_USER", account);
		
		getServletContext().getRequestDispatcher("/sales").forward(req, resp);
	}
}
