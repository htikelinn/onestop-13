<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    

<c:set var="root" value="${pageContext.request.contextPath}"></c:set>

<nav class="navbar navbar-expand navbar-dark bg-primary">
	<div class="container">
		<div class="d-flex align-items-center">
			<a class="navbar-brand" href="${root}/products">My Shop</a>
			<form action="${root}/products" class="d-flex">
				<div class="input-group">
					<input class="form-control" name="keyword" value="${param.keyword}" placeholder="Search Keyword" />
					<button class="btn-outline-primary input-group-text">
						<i class="bi-search"></i>
					</button>
				</div>
			</form>
		</div>
		<ul class="navbar-nav">
			<c:if test="${null != myCart && myCart.totalItems > 0}">
			<li class="nav-item">
				<a class="nav-link" href="${root}/cart/checkout">
					<i class="bi-cart"></i> ${myCart.totalItems}
				</a>
			</li>
			</c:if>
			<c:choose>
				<c:when test="${null == loginUser}">
				<li class="nav-item">
					<a class="nav-link" href="${root}/signin">
						<i class="bi-unlock"></i> Sign In
					</a>
				</li>
				</c:when>
				<c:otherwise>
				<li class="nav-item">
					<a class="nav-link" href="${root}/sales">
						<i class="bi-calendar"></i> Invoices
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="${root}/signout">
						<i class="bi-lock"></i> Sign Out
					</a>
				</li>
				</c:otherwise>
			</c:choose>
		</ul>
	</div>
</nav>
