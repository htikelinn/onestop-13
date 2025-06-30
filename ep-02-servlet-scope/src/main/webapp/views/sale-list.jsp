<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>
	<h3><i class="bi-list"></i> Invoice List</h3>
	
	<table class="table table-striped table-bordered">
		<thead>
			<tr>
				<th>ID</th>
				<th>Sale At</th>
				<th>Customer</th>
				<th>Phone</th>
				<th class="text-end">Items</th>
				<th class="text-end">Total</th>
				<th></th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="item" items="${list}">
			<tr>
				<td>${item.id}</td>
				<td>${item.saleDateTime}</td>
				<td>${item.account.name}</td>
				<td>${item.account.phone}</td>
				<td class="text-end">${item.totalItems}</td>
				<td class="text-end">
					<fmt:formatNumber value="${item.total}" /> 
				</td>
				<td class="text-center">
					<c:url var="saleDetailsUrl" value="/sales">
						<c:param name="id" value="${item.id}" />
					</c:url>
					<a href="${saleDetailsUrl}" class="icon-link">
						<i class="bi-arrow-right"></i>
					</a>
				</td>
			</tr>
			</c:forEach>
		</tbody>
	</table>
</app:layout>