package com.jdc.clinic.security.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.auth.PermissionPk;
import com.jdc.clinic.domain.auth.entity.Permission;
import com.jdc.clinic.domain.auth.entity.Role;
import com.jdc.clinic.domain.auth.repo.FeatureRepo;
import com.jdc.clinic.domain.auth.repo.PermissionRepo;
import com.jdc.clinic.domain.auth.repo.RoleRepo;
import com.jdc.clinic.domain.utils.ClinicBusinessException;
import com.jdc.clinic.security.input.RoleForm;
import com.jdc.clinic.security.input.RoleFormItem;
import com.jdc.clinic.security.input.RoleSearch;
import com.jdc.clinic.security.output.RoleDetails;
import com.jdc.clinic.security.output.RoleItem;
import com.jdc.clinic.utils.ModificationResult;

@Service
@Transactional(readOnly = true)
public class RoleService {
	
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private FeatureRepo featureRepo;
	@Autowired
	private PermissionRepo permissionRepo;

	public List<RoleItem> search(RoleSearch search) {
		return roleRepo.search(cb -> {
			var cq = cb.createQuery(RoleItem.class);
			var root = cq.from(Role.class);
			RoleItem.select(cq, root);
			cq.where(search.where(cb, root));
			return cq;
		});
	}

	public RoleDetails findById(int id) {
		return safeCall(roleRepo.findById(id).map(RoleDetails::from), "role", "id", id);
	}

	@Transactional
	public ModificationResult<Integer> create(RoleForm form) {
		
		if(roleRepo.countByRoleName(form.name()) > 0) {
			throw new ClinicBusinessException("%s role is already created.".formatted(form.name()));
		}
		
		var role = roleRepo.save(form.entity());
		
		for(var formItem : form.permissions()) {
			var feature = safeCall(featureRepo.findById(formItem.path()), 
					"feature", "path", formItem.path());
			
			var permission = new Permission();
			var permissionId = new PermissionPk();
			permissionId.setFeatureId(feature.getPath());
			permissionId.setRoleId(role.getId());
			
			permission.setId(permissionId);
			permission.setFeature(feature);
			permission.setRole(role);
			
			permission.setRead(formItem.read());
			permission.setWrite(formItem.write());
			permission.setModify(formItem.modify());
			permission.setDelete(formItem.delete());
			
			permissionRepo.save(permission);
		}
		
		return new ModificationResult<>(role.getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, RoleForm form) {
		
		var entity = safeCall(roleRepo.findById(id), "role", "id", id);
		
		if(!entity.getName().equals(form.name()) 
				&& roleRepo.countByRoleName(form.name()) > 0) {
			throw new ClinicBusinessException("%s role is already created.".formatted(form.name()));
		}
		
		entity.setName(form.name());
		entity.setDescription(form.description());
		
		Map<String, RoleFormItem> itemMap = form.permissions().stream()
				.collect(Collectors.toMap(RoleFormItem::path, Function.identity()));
		
		for(var permission : entity.getPermissions()) {
			var formItem = itemMap.get(permission.getId().getFeatureId());
			
			if(null != formItem) {
				permission.setRead(formItem.read());
				permission.setWrite(formItem.write());
				permission.setModify(formItem.modify());
				permission.setDelete(formItem.delete());
			}
		}
		
		return new ModificationResult<>(entity.getId());
	}

}
