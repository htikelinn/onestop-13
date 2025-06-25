<%@ tag language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>    

<%@ attribute name="label" required="true" %>

<div class="mb-3">
	<label class="form-label">${label}</label>
	<jsp:doBody></jsp:doBody>
</div>