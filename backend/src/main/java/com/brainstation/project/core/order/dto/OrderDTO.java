package com.brainstation.project.core.order.dto;

import com.brainstation.project.model.Order;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(value = "userorder")
public class OrderDTO {

    @Id
    private String id;

    private String userId;
    private List<Order> orders;

    public OrderDTO() {
        orders = new ArrayList<>();
    }

    public OrderDTO(String id, String userId, List<Order> orders) {
        this.id = id;
        this.userId = userId;
        this.orders = orders;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }
}
