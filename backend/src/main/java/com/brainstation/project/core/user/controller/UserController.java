package com.brainstation.project.core.user.controller;

import com.brainstation.project.core.UserPayment.service.UserPaymentServiceImpl;
import com.brainstation.project.core.address.service.AddressServiceImpl;
import com.brainstation.project.core.cart.service.CartServiceImpl;
import com.brainstation.project.core.order.service.OrderServiceImpl;
import com.brainstation.project.core.user.service.UserServiceImpl;
import com.brainstation.project.model.CustomResponse;
import com.brainstation.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping(value = "/user")
@CrossOrigin
@RestController
public class UserController {

    private UserServiceImpl userService;
    private CartServiceImpl cartService;
    private AddressServiceImpl addressService;
    private OrderServiceImpl orderService;
    private UserPaymentServiceImpl userPaymentService;

    @Autowired
    public UserController(UserServiceImpl userService, CartServiceImpl cartService, AddressServiceImpl addressService, OrderServiceImpl orderService, UserPaymentServiceImpl userPaymentService) {
        this.userService = userService;
        this.cartService = cartService;
        this.addressService = addressService;
        this.orderService = orderService;
        this.userPaymentService = userPaymentService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getAllUsers() {
        List<User> userList = this.userService.getAllUsers();
        CustomResponse response = new CustomResponse(userList);
        ResponseEntity<CustomResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);
        return responseEntity;
    }

    @RequestMapping(value = "/{email}", method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getUser(@PathVariable String email) {
        User user = userService.getUser(email);
        CustomResponse response = new CustomResponse(user);
        ResponseEntity<CustomResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);
        return responseEntity;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addUser(@RequestBody User userReq) {
        User user = this.userService.addUser(userReq);
        cartService.addCart(user.getId());
        addressService.addAddress(user.getId());
        orderService.addNewUserOrder(user.getId());
        userPaymentService.addUserPayment(user.getId());
        CustomResponse response = new CustomResponse(user);
        ResponseEntity<CustomResponse> responseEntity = new ResponseEntity<>(response, HttpStatus.OK);
        return responseEntity;
    }
}