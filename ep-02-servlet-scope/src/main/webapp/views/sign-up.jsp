<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>

	<div class="row h-100">
		<!-- Cover Image -->
		<div class="col d-flex flex-column align-items-center justify-content-center">
			<i class="bi-person-plus" style="font-size: 200px"></i>
			<h4>Welcome to MY SHOP!</h4>
		</div>		
		<!-- Sign In Form -->
		<div class="col d-flex align-items-center">
			<c:url value="/signup" var="signUpUrl"></c:url>
			<form action="${signUpUrl}" method="post" style="width: 380px;" class="login-form">
				
				<h4 class="mb-4"><i class="bi-person-plus"></i> Sign Up</h4>
				
				<app:form-group label="Member Name">
					<input name="name" class="form-control" placeholder="Please enter your name" required="required"> 
				</app:form-group>

				<app:form-group label="Email">
					<input name="email" class="form-control" placeholder="Please enter email for login id" required="required"> 
				</app:form-group>
				
				<app:form-group label="Password">
					<input name="password" type="password" class="form-control" placeholder="Please enter password" required="required"> 
				</app:form-group>
				
				<app:form-group label="Phone">
					<input name="phone" class="form-control" placeholder="Please enter phone number" required="required"> 
				</app:form-group>
				<div>
					
					<c:url value="/signin" var="signInUrl"></c:url>
					<a href="${signInUrl}" class="btn btn-outline-danger">
						<i class="bi-unlock"></i> Sign In
					</a>
					
					<button type="submit" class="btn btn-outline-primary">
						<i class="bi-person-plus"></i> Sign Up
					</button>
				</div>
			</form>
		</div>	
	</div>
	
	
</app:layout>