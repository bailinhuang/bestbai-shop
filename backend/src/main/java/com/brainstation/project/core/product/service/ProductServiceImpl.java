package com.brainstation.project.core.product.service;

import com.brainstation.project.core.product.dao.ProductDAO;
import com.brainstation.project.core.product.dto.ProductDTO;
import com.brainstation.project.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    private ProductDAO productDAO;

    @Autowired
    public ProductServiceImpl(ProductDAO productDAO){
        this.productDAO = productDAO;
    }

    public Product getProduct(String id){
        ProductDTO productDTO = productDAO.findById(id).orElse(null);
        if(productDTO != null){
            return new Product(productDTO);
        } else {
            return null;
        }
    }

    public Product diminishStock(String id, int quantity){
        ProductDTO productDTO = productDAO.findById(id).orElse(null);
        if(productDTO != null){
            if(productDTO.getStock() >= quantity){
                productDTO.setStock(productDTO.getStock() - quantity);
            }
            productDAO.save(productDTO);
            return new Product(productDTO);
        } else {
            return null;
        }
    }

    public Page<Product> getProductsByCategory(String category, Integer page, Integer limit){
        Page<ProductDTO> productDTOList = productDAO.findByCategoryIgnoreCase(category, PageRequest.of(page, limit));
        Page<Product> products = productDTOList.map(Product::new);
        return products;
    }

    public Page<Product>  getProductsByName(String name, Integer page, Integer limit){
        Page<ProductDTO>  productDTOList = productDAO.findByNameLikeIgnoreCase(name, PageRequest.of(page, limit));
        Page<Product> products = productDTOList.map(Product::new);
        return products;
    }

    public Page<Product>  getProductsByNameAndCategory(String category,String name, Integer page, Integer limit){
        Page<ProductDTO> productDTOList = productDAO.findByCategoryAndNameLikeAllIgnoreCase(category, name, PageRequest.of(page, limit));
        Page<Product> products = productDTOList.map(Product::new);
        return products;
    }

    public Page<Product> getProducts(Integer page, Integer limit){
        Page<ProductDTO> productDTOList = productDAO.findAll(PageRequest.of(page, limit));
        Page<Product> products = productDTOList.map(Product::new);
        return products;
    }

    public List<Product> getAllProducts()
    {
        List<ProductDTO> productDTOList =  productDAO.findAll();
        ArrayList<Product> products = new ArrayList<>();
        if(productDTOList.size() > 0){
            productDTOList.forEach(productDTO -> products.add(new Product(productDTO)));
            return products;
        } else{
            return null;
        }
    }

    public Product addProduct(Product product){
        ProductDTO productDTO = new ProductDTO(product);
        productDAO.save(productDTO);
        return new Product(productDTO);
    }

    public Product editProduct(Product product){
        return null;
    }
}
