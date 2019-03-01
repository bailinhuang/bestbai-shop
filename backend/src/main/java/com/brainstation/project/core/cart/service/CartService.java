package com.brainstation.project.core.cart.service;

import com.brainstation.project.model.Cart;
import com.brainstation.project.model.Product;

public interface CartService {
    public Cart getCart(String userId);

    public Cart addCart(String userId);

    public Cart addProductToCart(Product product, String userId);

    public boolean deleteAllCartItems();

    public Cart deleteCartItem(String userId, String productId);
}
