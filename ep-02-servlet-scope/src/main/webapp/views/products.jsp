<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Scope Demo</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css">

<c:set var="root" value="${pageContext.request.contextPath}"></c:set>

</head>
<body>

	<nav class="navbar navbar-expend navbar-dark bg-primary">
		<div class="container">
			<a class="navbar-brand" href="${root}/products">My Shop</a>
			<div class="d-flex">
				<form action="${root}/products" class="d-flex">
					<div class="input-group">
						<input class="form-control" name="keyword" value="${param.keyword}" placeholder="Search Keyword" />
						<button class="btn-outline-primary input-group-text">
							<i class="bi-search"></i>
						</button>
					</div>
				</form>
				<ul class="navbar-nav ms-5">
					<li class="nav-item">
						<a class="nav-link">
							<i class="bi-cart"></i> My Cart
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	
	<div class="container pt-4">
		<div class="row row-cols-3 g-4">
			<c:forEach items="${list}" var="product">
				<div class="col">
					<div class="card">
						<div class="card-body">
							<div class="d-flex justify-content-between align-items-center">
								<h4>${product.name()}</h4>
								<a class="icon-link">
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
	</div>
</body>
</html>