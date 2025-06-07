<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>

</head>
<body>

	<main class="container mt-4">
		<h1>Hello Servlet</h1>
		
		<div action="hello" method="post" class="card w-50">
			<div class="card-body">
				<h5 class="card-title">Hello Servlet</h5>
				
				<div>
	
			</div>
				${message}
			</div>
			
			<div class="card-footer">
				<a href="/ep-01-hello-servlet" class="btn btn-primary">Home</a>
			</div>
		</div>
	</main>


</body>
</html>