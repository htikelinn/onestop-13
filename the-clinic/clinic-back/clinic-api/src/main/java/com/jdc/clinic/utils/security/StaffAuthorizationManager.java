package com.jdc.clinic.utils.security;

import java.util.Map;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.jdc.clinic.auth.output.PermissionItem;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.master.repo.EmployeeRepo;

public class StaffAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Override
	@Transactional(readOnly = true)
	public AuthorizationDecision check(Supplier<Authentication> authentication, RequestAuthorizationContext requestContext) {
		
		var authorities = authentication.get().getAuthorities().stream().map(a -> a.getAuthority()).toList();
		
		if(Type.is(authorities, Type.Admin)) {
			return new AuthorizationDecision(true);
		}
		
		if(!Type.is(authorities, Type.Employee)) {
			return new AuthorizationDecision(false);
		}
		
		if(!permit(authentication.get().getName(), requestContext)) {
			return new AuthorizationDecision(false);
		}

		return new AuthorizationDecision(true);
	}

	private boolean permit(String username, RequestAuthorizationContext requestContext) {
		
		var employee = employeeRepo.findOneByAccountEmail(username).orElse(null);
		
		if(null == employee) {
			return false;
		}
		
		var permissions = employee.getRole().getPermissions().stream()
				.filter(a -> a.getPermission() != null)
				.map(a -> new PermissionItem(a.getId().getFeatureId(), a.getPermission()))
					.collect(Collectors.toMap(a -> a.path(), a -> a.permission().name()));
		
		var servletPath = requestContext.getRequest().getServletPath();
		
		var permission = getPermission(permissions, servletPath);
		
		if(StringUtils.hasLength(permission)) {
			var requestMethod = requestContext.getRequest().getMethod();
			return isMatch(permission, requestMethod);
		}
		
		if(servletPath.startsWith("/staff/menu") 
				|| servletPath.startsWith("/staff/permissions")) {
			return true;
		}
		
		return false;
	}

	private String getPermission(Map<String, String> permissions,
			String servletPath) {
		
		for(var key : permissions.keySet()) {
			if(servletPath.startsWith(key)) {
				return permissions.get(key);
			}
		}
		
		return null;
	}

	private boolean isMatch(String key, String requestMethod) {
		return switch(key) {
			case "Read": {
				yield "get".equals(requestMethod.toLowerCase());
			}
			case "Write": {
				yield "get".equals(requestMethod.toLowerCase()) 
					|| "post".equals(requestMethod.toLowerCase());
			}
			case "Modify": {
				yield "get".equals(requestMethod.toLowerCase()) 
					|| "post".equals(requestMethod.toLowerCase())
					|| "put".equals(requestMethod.toLowerCase())
					|| "patch".equals(requestMethod.toLowerCase());
			}
			case "Delete": {
				yield "get".equals(requestMethod.toLowerCase()) 
					|| "post".equals(requestMethod.toLowerCase())
					|| "put".equals(requestMethod.toLowerCase())
					|| "patch".equals(requestMethod.toLowerCase())
					|| "delete".equals(requestMethod.toLowerCase());
			}
			default : {
				yield false;
			}
		};
	}

}
