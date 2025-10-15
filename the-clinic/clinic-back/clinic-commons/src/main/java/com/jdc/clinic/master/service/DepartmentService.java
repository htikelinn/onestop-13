package com.jdc.clinic.master.service;

import static com.jdc.clinic.utils.EntityOperations.safeCall;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.master.entity.Department;
import com.jdc.clinic.domain.master.repo.DepartmentRepo;
import com.jdc.clinic.domain.utils.ClinicBusinessException;
import com.jdc.clinic.master.input.DepartmentForm;
import com.jdc.clinic.master.input.DepartmentSearch;
import com.jdc.clinic.master.output.DepartmentDetails;
import com.jdc.clinic.master.output.DepartmentListItem;
import com.jdc.clinic.utils.ModificationResult;

@Service
@Transactional(readOnly = true)
public class DepartmentService {
	
	@Autowired
	private DepartmentRepo repo;

	public List<DepartmentListItem> search(DepartmentSearch search) {
		return repo.search(cb -> {
			var cq = cb.createQuery(DepartmentListItem.class);
			var root = cq.from(Department.class);
			
			DepartmentListItem.select(cb, cq, root);
			cq.where(search.where(cb, root));
			
			return cq;
		});
	}

	public DepartmentDetails findById(int id) {
		return safeCall(repo.findById(id).map(DepartmentDetails::from), 
				"department", "id", id);
	}
	
	@Transactional
	public ModificationResult<Integer> create(DepartmentForm form) {
		
		if(repo.countByName(form.name()) > 0) {
			throw new ClinicBusinessException("%s is already created.".formatted(form.name()));
		}
		
		var entity = repo.save(form.entity());
		return new ModificationResult<Integer>(entity.getId());
	}

	@Transactional
	public ModificationResult<Integer> update(int id, DepartmentForm form) {
		
		var entity = safeCall(repo.findById(id), "department", "id", id);
		
		if(!entity.getName().equals(form.name()) 
				&& repo.countByName(form.name()) > 0) {
			throw new ClinicBusinessException("%s is already created.".formatted(form.name()));
		}
		
		form.update(entity);
		
		return new ModificationResult<Integer>(entity.getId());
	}

}
