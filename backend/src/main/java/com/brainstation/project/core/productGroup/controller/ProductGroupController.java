package com.brainstation.project.core.productGroup.controller;

import com.brainstation.project.core.productGroup.service.ProductGroupServiceImpl;
import com.brainstation.project.model.CustomResponse;
import com.brainstation.project.model.Product;
import com.brainstation.project.model.ProductGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping(value = "/productgroup")
@CrossOrigin
@RestController
public class ProductGroupController{

    private ProductGroupServiceImpl productGroupService;

    @Autowired
    public ProductGroupController(ProductGroupServiceImpl productGroupService) {
        this.productGroupService = productGroupService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getProductGroupsByPage(@RequestParam(required = false) Integer page , @RequestParam(required = false) Integer limit){
        List<ProductGroup> productGroupList;
        if(page != null && limit != null){
            productGroupList =  productGroupService.getProductGroupsByPage(page, limit);
        } else {
            productGroupList =  productGroupService.getAllProductGroups();
        }
        CustomResponse response = new CustomResponse(productGroupList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addProductGroup(@RequestBody Product product){
        ProductGroup productGroup = productGroupService.addProductGroup(product);
        CustomResponse response = new CustomResponse(productGroup);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
