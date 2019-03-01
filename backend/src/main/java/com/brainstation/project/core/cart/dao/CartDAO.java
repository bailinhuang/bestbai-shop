package com.brainstation.project.core.cart.dao;

import com.brainstation.project.core.cart.dto.CartDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartDAO extends MongoRepository<CartDTO, String> {

    public CartDTO findByUserId(String userId);
}
