package com.brainstation.project.core.product.dto;

import com.brainstation.project.model.Product;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "product")
public class ProductDTO  {

    @Id
    private String id;

    private String name;
    private double price;
    private String image;
    private String description;
    private String category;
    private double weight;
    private double shippingWeight;
    private Object additionalDetails;
    private int stock;
    private int quantity;

    public ProductDTO(){}

    public ProductDTO(Product product) {
        this.name = product.getName();
        this.price = product.getPrice();
        this.image = product.getImage();
        this.description = product.getDescription();
        this.category = product.getCategory();
        this.weight = product.getWeight();
        this.shippingWeight = product.getShippingWeight();
        this.additionalDetails = product.getAdditionalDetails();
        this.stock = product.getStock();
        this.quantity = product.getQuantity();
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getShippingWeight() {
        return shippingWeight;
    }

    public void setShippingWeight(double shippingWeight) {
        this.shippingWeight = shippingWeight;
    }

    public Object getAdditionalDetails() {
        return additionalDetails;
    }

    public void setAdditionalDetails(Object additionalDetails) {
        this.additionalDetails = additionalDetails;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
