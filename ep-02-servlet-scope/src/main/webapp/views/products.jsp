<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>
	<div class="row row-cols-3 g-4">
		<c:forEach items="${list}" var="product">
			<div class="col">
				<div class="card">
					<div class="card-body">
						<div class="d-flex justify-content-between align-items-center">
							<h4>${product.name()}</h4>
							<c:url var="addToCart" value="/cart/add">
								<c:param name="id" value="${product.id()}" />
								<c:param name="home" value="1" />
								<c:param name="keyword" value="${param.keyword}" />
							</c:url>
							<a href="${addToCart}" class="icon-link">
								<i class="bi-cart-plus"></i>
							</a>
						</div>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<div>${product.category()}</div>
						<span>${product.price()}</span>
					</div>
				</div>
			</div>
		</c:forEach>
	</div>
</app:layout>