package com.brainstation.project.core.order.dao;

import com.brainstation.project.core.order.dto.OrderDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.awt.print.Pageable;

public interface OrderDAO extends MongoRepository<OrderDTO, String> {

    OrderDTO findByUserId(String userId) ;
}
