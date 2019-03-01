package com.brainstation.project.core.order.service;

import com.brainstation.project.core.order.dto.OrderDTO;
import com.brainstation.project.model.Order;

import java.util.List;

public interface OrderService {

    Order addUserOrder(String userId, Order order);
    List<Order> getUserOrders(String userId);
}
