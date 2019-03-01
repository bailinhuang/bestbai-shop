package com.brainstation.project.core.cart.service;

import com.brainstation.project.core.cart.dao.CartDAO;
import com.brainstation.project.core.cart.dto.CartDTO;
import com.brainstation.project.core.product.dto.ProductDTO;
import com.brainstation.project.model.Cart;
import com.brainstation.project.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    private CartDAO cartDAO;

    @Autowired
    public CartServiceImpl(CartDAO cartDAO) {
        this.cartDAO = cartDAO;
    }

    public Cart getCart(String userId){
        CartDTO cartDTO = cartDAO.findByUserId(userId);
        return new Cart(cartDTO);
    }

    public Cart addCart(String userId){
        CartDTO cartDTO = new CartDTO(userId);
        cartDAO.save(cartDTO);
        return new Cart(cartDTO);
    }

    public Cart addProductToCart(Product product, String userId) {
        CartDTO cartDTO = cartDAO.findByUserId(userId);
        cartDTO.getCartList().add(product);
        cartDAO.save(cartDTO);
        return new Cart(cartDTO);
    }

    public boolean deleteAllCartItems() {
        return false;
    }

    public Cart deleteCartItem(String userId, String productId) {
        CartDTO cartDTO = cartDAO.findByUserId(userId);
        int index = 0;
        boolean isDeleted = false;
        for(Product products : cartDTO.getCartList()){
            if(products.getId().equals(productId)){
                isDeleted = true;
                break;
            }
            index++;
        }
        if(isDeleted){
            cartDTO.getCartList().remove(index);
            cartDAO.save(cartDTO);
        }
        return new Cart(cartDTO);
    }
}
