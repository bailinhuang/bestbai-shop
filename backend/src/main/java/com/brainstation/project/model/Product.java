package com.brainstation.project.model;

import com.brainstation.project.core.product.dto.ProductDTO;
public class Product {

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

    public Product() {

    }

    public Product(String id, String name, double price, String image, String description, String category, double weight, double shippingWeight, Object additionalDetails, int stock, int quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category = category;
        this.weight = weight;
        this.shippingWeight = shippingWeight;
        this.additionalDetails = additionalDetails;
        this.stock = stock;
        this.quantity = quantity;
    }

    public Product(ProductDTO productDTO) {
        this.id = productDTO.getId();
        this.name = productDTO.getName();
        this.price = productDTO.getPrice();
        this.image = productDTO.getImage();
        this.description = productDTO.getDescription();
        this.category = productDTO.getCategory();
        this.weight = productDTO.getWeight();
        this.shippingWeight = productDTO.getShippingWeight();
        this.additionalDetails = productDTO.getAdditionalDetails();
        this.stock = productDTO.getStock();
        this.quantity = productDTO.getQuantity();
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

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Object getAdditionalDetails() {
        return additionalDetails;
    }

    public void setAdditionalDetails(Object additionalDetails) {
        this.additionalDetails = additionalDetails;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
