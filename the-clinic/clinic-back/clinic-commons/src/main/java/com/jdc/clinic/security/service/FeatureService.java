package com.jdc.clinic.security.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jdc.clinic.domain.auth.entity.Feature;
import com.jdc.clinic.domain.auth.entity.Feature_;
import com.jdc.clinic.domain.auth.repo.FeatureRepo;
import com.jdc.clinic.security.input.FeatureSearch;
import com.jdc.clinic.security.output.AppFeature;

@Service
@Transactional(readOnly = true)
public class FeatureService {
	
	@Autowired
	private FeatureRepo repo;

	public List<AppFeature> search(FeatureSearch search) {
		return repo.search(cb -> {
			var cq = cb.createQuery(AppFeature.class);

			var root = cq.from(Feature.class);
			AppFeature.select(cq, root);
			cq.where(search.where(cb, root));
			
			return cq;
		});
	}

	public List<String> findGroup() {
		return repo.search(cb -> {
			var cq = cb.createQuery(String.class);
			var root = cq.from(Feature.class);
			cq.select(root.get(Feature_.category)).distinct(true);
			return cq;
		});
	}

}
