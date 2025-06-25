package com.jdc.scope.servlet.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebFilter(urlPatterns = "/sales")
public class SalesFilter implements Filter{

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		HttpServletRequest req = (HttpServletRequest) request;
		var session = req.getSession(true);
		
		var account = session.getAttribute("LOGIN_USER");
		
		if(null == account) {
			HttpServletResponse resp = (HttpServletResponse) response;
			resp.sendRedirect(req.getServletContext().getContextPath().concat("/signin"));
			return;
		}
		
		chain.doFilter(request, response);
	}

}
