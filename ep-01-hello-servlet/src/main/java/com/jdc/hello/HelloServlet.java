package com.jdc.hello;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(
	name = "helloServlet",
	urlPatterns = {
		"/hello",
		"/hello-world"
})
public class HelloServlet extends HttpServlet{

	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		var name = req.getParameter("userName");
		var context = getServletContext();
		var dispatcher = context.getRequestDispatcher("/get-result.jsp");
		req.setAttribute("message", "Hello %s.".formatted(name));
		dispatcher.forward(req, resp);
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		var context = getServletContext();
		var dispatcher = context.getRequestDispatcher("/get-result.jsp");
		req.setAttribute("message", "Message from Hello Servlet");
		dispatcher.forward(req, resp);
	}
	
}
