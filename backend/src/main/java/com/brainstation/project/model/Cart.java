package com.brainstation.project.model;

import com.brainstation.project.core.cart.dto.CartDTO;

import java.util.List;

public class Cart{

    private String id;

    private String userId;
    private List<Product> cartList;

    public Cart() {
    }

    public Cart(String id, String userId, List<Product> cartList) {
        this.id = id;
        this.userId = userId;
        this.cartList = cartList;
    }

    public Cart(CartDTO cartDTO) {
        this.id = cartDTO.getId();
        this.userId = cartDTO.getUserId();
        this.cartList = cartDTO.getCartList();
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

    public List<Product> getCartList() {
        return cartList;
    }

    public void setCartList(List<Product> cartList) {
        this.cartList = cartList;
    }
}
