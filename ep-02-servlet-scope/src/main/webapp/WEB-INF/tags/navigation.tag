<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    

<c:set var="root" value="${pageContext.request.contextPath}"></c:set>

<nav class="navbar navbar-expend navbar-dark bg-primary">
	<div class="container">
		<a class="navbar-brand" href="${root}/products">My Shop</a>
		<div class="d-flex">
			<c:if test="${null != myCart && myCart.totalItems > 0}">
			<ul class="navbar-nav me-4">
				<li class="nav-item">
					<a class="nav-link" href="${root}/cart/checkout">
						<i class="bi-cart"></i> ${myCart.totalItems}
					</a>
				</li>
			</ul>
			</c:if>
			<form action="${root}/products" class="d-flex">
				<div class="input-group">
					<input class="form-control" name="keyword" value="${param.keyword}" placeholder="Search Keyword" />
					<button class="btn-outline-primary input-group-text">
						<i class="bi-search"></i>
					</button>
				</div>
			</form>
		</div>
	</div>
</nav>
