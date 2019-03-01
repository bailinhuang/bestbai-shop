package com.brainstation.project.core.productGroup.dao;

import com.brainstation.project.core.productGroup.dto.ProductGroupDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductGroupDAO extends MongoRepository<ProductGroupDTO, String> {

    public Page<ProductGroupDTO> findAllByCategory(String category, Pageable page);
}
