package com.brainstation.project.core.UserPayment.dao;

import com.brainstation.project.core.UserPayment.dto.UserPaymentDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserPaymentDAO extends MongoRepository<UserPaymentDTO, String> {
    UserPaymentDTO findByUserId(String userId);
}
