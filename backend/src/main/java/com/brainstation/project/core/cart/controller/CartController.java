package com.brainstation.project.core.cart.controller;

import com.brainstation.project.core.cart.service.CartServiceImpl;
import com.brainstation.project.model.Cart;
import com.brainstation.project.model.CustomResponse;
import com.brainstation.project.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/cart")
@CrossOrigin
@RestController
public class CartController {

    private CartServiceImpl cartService;

    @Autowired
    public CartController(CartServiceImpl cartService) {
        this.cartService = cartService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getCart(
            @RequestParam String userId
    ) {
        Cart cart = cartService.getCart(userId);
        CustomResponse response = new CustomResponse(cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addToCart(
            @RequestParam String userId,
            @RequestBody Product product
    ) {
        Cart cart = cartService.addProductToCart(product, userId);
        CustomResponse response = new CustomResponse(cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity<CustomResponse> deleteCartItem(
            @RequestParam String userId,
            @RequestParam String productId
    ) {
        Cart cart = cartService.deleteCartItem(userId, productId);
        CustomResponse response = new CustomResponse(cart);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
