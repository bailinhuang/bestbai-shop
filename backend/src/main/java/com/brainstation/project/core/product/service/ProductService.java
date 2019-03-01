package com.brainstation.project.core.product.service;

import com.brainstation.project.model.Product;

import java.util.List;

public interface ProductService {

    public Product getProduct(String id);
    public List<Product> getAllProducts();
    public Product addProduct(Product product);
    public Product editProduct(Product product);
}
