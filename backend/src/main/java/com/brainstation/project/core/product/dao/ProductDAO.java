package com.brainstation.project.core.product.dao;

import com.brainstation.project.core.product.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductDAO extends MongoRepository<ProductDTO, String> {

    Page<ProductDTO> findByCategoryIgnoreCase(String category, Pageable pageable);

    Page<ProductDTO> findByNameLikeIgnoreCase(String name, Pageable pageable);

    Page<ProductDTO> findByCategoryAndNameLikeAllIgnoreCase(String category, String name, Pageable pageable);
}
