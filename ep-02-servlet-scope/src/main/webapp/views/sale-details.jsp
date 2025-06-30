<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="f" uri="jakarta.tags.fmt" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>
	<h3><i class="bi-cart-check"></i> Invoice Details</h3>
	
	<table class="w-50 mt-3 table table-striped table-bordered">
		<tr>
			<th>Customer</th>
			<td>${sale.account.name}</td>
		</tr>
		<tr>
			<th>Phone</th>
			<td>${sale.account.phone}</td>
		</tr>
		<tr>
			<th>Sale At</th>
			<td>${sale.saleDateTime}</td>
		</tr>
	</table>
	
	<h4>
		<i class="bi-list"></i> Items
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
			<c:forEach items="${sale.items}" var="item" varStatus="sts">
			<tr>
				<td>${sts.index + 1}</td>
				<td>${item.product.category()}</td>
				<td>${item.product.name()}</td>
				<td class="text-end">
					<f:formatNumber value="${item.product.price()}" />
				</td>
				<td class="text-end">
					<f:formatNumber value="${item.quantity}" />
				</td>
				<td class="text-end">
					<f:formatNumber value="${sale.total}" />
				</td>
			</tr>	
			</c:forEach>
		</tbody>
		
		<tfoot>
			<tr>
				<td colspan="4">All Total</td>
				<td class="text-end">
					<f:formatNumber value="${sale.totalItems}" />
				</td>
				<td class="text-end">
					<f:formatNumber value="${sale.total}" />
				</td>
			</tr>
		</tfoot>
	</table>	
</app:layout>