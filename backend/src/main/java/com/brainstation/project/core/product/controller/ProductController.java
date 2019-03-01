package com.brainstation.project.core.product.controller;

import com.brainstation.project.core.product.dto.ProductDTO;
import com.brainstation.project.core.product.service.ProductService;
import com.brainstation.project.core.product.service.ProductServiceImpl;
import com.brainstation.project.model.CustomResponse;
import com.brainstation.project.model.Product;
import com.brainstation.project.utils.RequestValidatorUTIL;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RequestMapping(value = "/product")
@RestController
public class ProductController {

    private RequestValidatorUTIL requestValidator;
    private ProductServiceImpl productService;

    @Autowired
    public ProductController(ProductServiceImpl productService) {
        this.productService = productService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getProduct(@PathVariable String id) {
        Product product = productService.getProduct(id);
        CustomResponse response = new CustomResponse(product);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getAllProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String page,
            @RequestParam(required = false) String limit,
            @RequestParam(required = false) String name) {
        if (RequestValidatorUTIL.validateUndefined(page) || RequestValidatorUTIL.validateUndefined(limit)) {
            page = "0";
            limit = "8";
        }
        int pageInt = Integer.parseInt(page);
        int limitInt = Integer.parseInt(limit);
        Page<Product> products;
        if (!RequestValidatorUTIL.validateUndefined(name) && !RequestValidatorUTIL.validateUndefined(category)) {
            products = productService.getProductsByNameAndCategory(category, name, pageInt, limitInt);
        } else if (!RequestValidatorUTIL.validateUndefined(name)) {
            products = productService.getProductsByName(name, pageInt, limitInt);
        } else if (!RequestValidatorUTIL.validateUndefined(category)) {
            products = productService.getProductsByCategory(category, pageInt, limitInt);
        } else {
            products = productService.getProducts(pageInt, limitInt);
        }
        CustomResponse response = new CustomResponse(products);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addProduct(@RequestBody Product product) {
        Product productResult = productService.addProduct(product);
        CustomResponse response = new CustomResponse(productResult);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
