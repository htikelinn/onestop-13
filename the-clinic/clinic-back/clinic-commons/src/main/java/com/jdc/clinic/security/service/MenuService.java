package com.jdc.clinic.security.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.auth.output.MenuGroup;
import com.jdc.clinic.auth.output.MenuItem;
import com.jdc.clinic.domain.auth.entity.Account.Type;
import com.jdc.clinic.domain.auth.entity.Feature;
import com.jdc.clinic.domain.auth.entity.Permission;
import com.jdc.clinic.domain.auth.repo.AccountRepo;
import com.jdc.clinic.domain.auth.repo.EmployeeRepo;
import com.jdc.clinic.domain.auth.repo.FeatureRepo;

@Service
public class MenuService {
	
	@Autowired
	private AccountRepo accountRepo;
	
	@Autowired
	private EmployeeRepo employeeRepo;
	
	@Autowired
	private FeatureRepo featureRepo;

	@Transactional(readOnly = true)
	public List<MenuGroup> getUserMenu(String email) {
		
		var menuGraups = new ArrayList<MenuGroup>();
		
		var account = safeCall(accountRepo.findById(email), "account", "email", email);
		
		if(account.getType() == Type.Admin) {
			return getAdminMenus();
		}
		
		var employee = safeCall(employeeRepo.findOneByAccountEmail(email), "employee", "email", email);
		
		Map<String, List<Permission>> permissionsByGroup = employee.getRole().getPermissions()
				.stream().collect(Collectors.groupingBy(a -> a.getFeature().getCategory()));
		
		for(var group : permissionsByGroup.keySet()) {
			var menuItems = permissionsByGroup.get(group)
					.stream().filter(Permission::isAvailable)
					.map(Permission::getFeature)
					.map(MenuItem::from)
					.toList();
			
			if(menuItems.size() > 0) {
				menuGraups.add(new MenuGroup(group, menuItems));
			}
		}
		
		return menuGraups;
	}

	private List<MenuGroup> getAdminMenus() {
		
		var menuGraups = new ArrayList<MenuGroup>();

		var featureByGroup = featureRepo.findAll().stream()
				.collect(Collectors.groupingBy(Feature::getCategory));
		
		for(var group : featureByGroup.keySet()) {
			var menuItems = featureByGroup.get(group).stream()
					.map(MenuItem::from).toList();
			menuGraups.add(new MenuGroup(group, menuItems));
		}
		
		return menuGraups;
	}

}
