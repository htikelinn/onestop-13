<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>

	<div class="row h-100">
		<!-- Cover Image -->
		<div class="col d-flex flex-column align-items-center justify-content-center">
			<i class="bi-cart" style="font-size: 200px"></i>
			<h4>Welcome to MY SHOP!</h4>
		</div>		
		<!-- Sign In Form -->
		<div class="col d-flex align-items-center">
			<c:url value="/signin" var="signInUrl"></c:url>
			<form action="${signInUrl}" method="post" style="width: 380px;" class="login-form">
				
				<h4 class="mb-4"><i class="bi-unlock"></i> Sign In</h4>
				
				<c:if test="${not empty message}">
					<div class="alert alert-info">${message}</div>
				</c:if>
				
				<app:form-group label="Login ID">
					<input name="email" class="form-control" placeholder="Please enter login id" required="required"> 
				</app:form-group>
				
				<app:form-group label="Password">
					<input name="password" type="password" class="form-control" placeholder="Please enter password" required="required"> 
				</app:form-group>
				
				<div>
					
					<c:url value="/signup" var="signUpUrl"></c:url>
					<a href="${signUpUrl}" class="btn btn-outline-danger">
						<i class="bi-person-plus"></i> Sign Up
					</a>
					
					<button type="submit" class="btn btn-outline-primary">
						<i class="bi-unlock"></i> Sign In
					</button>
				</div>
			</form>
		</div>	
	</div>
	
	
</app:layout>