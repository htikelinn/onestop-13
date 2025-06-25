<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="f" uri="jakarta.tags.fmt" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>
	
	<h4>
		<i class="bi-cart"></i> My Cart
	</h4>
	
	<table class="table table-bordered">
		<thead>
			<tr>
				<th>No.</th>
				<th>Category</th>
				<th>Name</th>
				<th class="text-end">Unit Price</th>
				<th class="text-end">Quantity</th>
				<th class="text-end">Amount</th>
			</tr>
		</thead>
		<tbody>
			<c:forEach items="${myCart.items}" var="item" varStatus="sts">
			<tr>
				<td>${sts.index + 1}</td>
				<td>${item.product.category()}</td>
				<td>${item.product.name()}</td>
				<td class="text-end">
					<f:formatNumber value="${item.product.price()}" />
				</td>
				<td class="text-end d-flex justify-content-around align-items-center">
					<c:url var="removeItem" value="/cart/remove">
						<c:param name="id" value="${item.product.id()}" />
					</c:url>
					<a href="${removeItem}" class="icon-link">
						<i class="bi-dash"></i>
					</a>
					<f:formatNumber value="${item.quantity}" />
					<c:url var="addItem" value="/cart/add">
						<c:param name="id" value="${item.product.id()}" />
					</c:url>
					<a href="${addItem}" class="icon-link">
						<i class="bi-plus"></i>
					</a>
				</td>
				<td class="text-end">
					<f:formatNumber value="${item.total}" />
				</td>
			</tr>	
			</c:forEach>
		</tbody>
		
		<tfoot>
			<tr>
				<td colspan="4">All Total</td>
				<td class="text-end">
					<f:formatNumber value="${myCart.totalItems}" />
				</td>
				<td class="text-end">
					<f:formatNumber value="${myCart.totalAmount}" />
				</td>
			</tr>
		</tfoot>
	</table>
	
	<c:url var="confirmedUrl" value="/sales"></c:url>
	<form method="post" action="${confirmedUrl}" class="text-end">
		<c:url value="/cart/clear" var="clearLink"></c:url>
		<a href="${clearLink}" class="btn btn-outline-danger"><i class="bi-trash"></i> Clear</a>
		<button type="submit" class="btn btn-outline-primary">
			<i class="bi-check"></i> Confirm
		</button>
	</form>
	
</app:layout>