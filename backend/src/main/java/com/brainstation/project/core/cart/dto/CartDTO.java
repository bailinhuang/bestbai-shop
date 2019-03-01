package com.brainstation.project.core.cart.dto;

import com.brainstation.project.model.Cart;
import com.brainstation.project.model.Product;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(value = "cart")
public class CartDTO {

    @Id
    private String id;

    private String userId;
    private List<Product> cartList;

    public CartDTO() {
        this.cartList = new ArrayList<>();
    }

    public CartDTO(String userId) {
        this.userId = userId;
        this.cartList = new ArrayList<>();
    }

    public CartDTO(String id, String userId, List<Product> cartList) {
        this.id = id;
        this.userId = userId;
        this.cartList = cartList;
    }

    public CartDTO(Cart cart) {
        this.id = cart.getId();
        this.userId = cart.getUserId();
        this.cartList = cart.getCartList();
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
