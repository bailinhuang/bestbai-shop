package com.brainstation.project.model;

import com.brainstation.project.core.productGroup.dto.ProductGroupDTO;

import java.util.List;

public class ProductGroup {

    private String id;
    private List<String> productList;

    public ProductGroup() {
    }

    public ProductGroup(ProductGroupDTO productGroupDTO) {
        this.id = productGroupDTO.getId();
        this.productList = productGroupDTO.getProductList();
    }

    public ProductGroup(String id, List<String> productList) {
        this.id = id;
        this.productList = productList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<String> getProductList() {
        return productList;
    }

    public void setProductList(List<String> productList) {
        this.productList = productList;
    }
}
