package com.brainstation.project.core.order.service;

import com.brainstation.project.core.order.dao.OrderDAO;
import com.brainstation.project.core.order.dto.OrderDTO;
import com.brainstation.project.core.product.service.ProductServiceImpl;
import com.brainstation.project.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderDAO orderDAO;
    private ProductServiceImpl productService;

    @Autowired
    public OrderServiceImpl(OrderDAO orderDAO, ProductServiceImpl productService) {
        this.orderDAO = orderDAO;
        this.productService = productService;
    }

    public Order addUserOrder(String userId, Order order) {
        OrderDTO orderDTO = orderDAO.findByUserId(userId);
        order.getProducts().forEach(product -> productService.diminishStock(product.getId(), product.getQuantity()));
        orderDTO.getOrders().add(order);
        orderDAO.save(orderDTO);
        return order;
    }

    public void addNewUserOrder(String userId) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setUserId(userId);
        orderDAO.save(orderDTO);
    }

    public List<Order> getUserOrders(String userId) {
        OrderDTO orderDTO = orderDAO.findByUserId(userId);
        return orderDTO.getOrders();
    }
}
