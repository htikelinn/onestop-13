<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    
<%@ taglib prefix="app" tagdir="/WEB-INF/tags" %>

<app:layout>
	<h3>Sale List</h3>
	
	<table class="table table-striped">
		<thead>
			<tr>
				<th>ID</th>
				<th>Total</th>
			</tr>
		</thead>
		
		<tbody>
			<c:forEach var="item" items="${list}">
			<tr>
				<td>${item.id}</td>
				<td>${item.total}</td>
			</tr>
			</c:forEach>
		</tbody>
	</table>
</app:layout>