package com.brainstation.project.core.order.controller;

import com.brainstation.project.core.order.service.OrderServiceImpl;
import com.brainstation.project.model.CustomResponse;
import com.brainstation.project.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/userorders")
@CrossOrigin
@RestController
public class OrderController {

    private OrderServiceImpl orderService;

    @Autowired
    public OrderController(OrderServiceImpl orderService) {
        this.orderService = orderService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getUserOrders(@RequestParam String userId){
        List<Order> orders = orderService.getUserOrders(userId);
        CustomResponse response = new CustomResponse(orders);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addUserOrder(@RequestParam String userId, @RequestBody Order order){
        Order returnedOrder = orderService.addUserOrder(userId, order);
        CustomResponse response = new CustomResponse(returnedOrder);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
