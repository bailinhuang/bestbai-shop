package com.brainstation.project.core.productGroup.service;

import com.brainstation.project.core.product.dto.ProductDTO;
import com.brainstation.project.core.productGroup.dao.ProductGroupDAO;
import com.brainstation.project.core.productGroup.dto.ProductGroupDTO;
import com.brainstation.project.model.Product;
import com.brainstation.project.model.ProductGroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductGroupServiceImpl implements ProductGroupService{

    ProductGroupDAO productGroupDao;

    @Autowired
    public ProductGroupServiceImpl(ProductGroupDAO productGroupDao) {
        this.productGroupDao = productGroupDao;
    }

    public List<ProductGroup> getAllProductGroups(){
        ArrayList<ProductGroup> productGroupArrayList = new ArrayList<>();
        List<ProductGroupDTO> productGroupDTOArrayList =  productGroupDao.findAll();
        productGroupDTOArrayList.forEach(productGroupDTO -> productGroupArrayList.add(new ProductGroup(productGroupDTO)));
        return productGroupArrayList;
    }

    public List<ProductGroup> getProductGroupsByPage(int pageNumber, int limit){
        ArrayList<ProductGroup> productGroupArrayList = new ArrayList<>();
        Page<ProductGroupDTO> productDTOPage =  productGroupDao.findAll(PageRequest.of(pageNumber, limit));
        productDTOPage.forEach(
                productGroupDTO ->  productGroupArrayList.add(new ProductGroup(productGroupDTO))
        );
        return productGroupArrayList;
    }

    public ProductGroup addProductGroup(Product product){
        ProductGroupDTO productGroupDTO = new ProductGroupDTO();
        productGroupDTO.setProductList(new ArrayList<>());
        productGroupDTO.getProductList().add(product.getId());
        try{
            productGroupDao.save(productGroupDTO);
            return new ProductGroup(productGroupDTO);
        } catch (Exception e){
            System.out.println(e);
            return null;
        }
    }
}
