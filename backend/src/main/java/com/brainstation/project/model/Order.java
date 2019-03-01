package com.brainstation.project.model;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public class Order {

    private String id;
    private Date dateOrdered;
    private List<Product> products;
    private Card card;
    private Double price;
    private Double shippingPrice;
    private Address address;
    private String status;
    private Date dateReceived;

    public Order() {
        id = UUID.randomUUID().toString().replace("-", "");
    }

    public Order(String id, Date dateOrdered, List<Product> products, Card card, Double price, Double shippingPrice, Address address, String status, Date dateReceived) {
        this.id = id;
        this.dateOrdered = dateOrdered;
        this.products = products;
        this.card = card;
        this.price = price;
        this.shippingPrice = shippingPrice;
        this.address = address;
        this.status = status;
        this.dateReceived = dateReceived;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getDateOrdered() {
        return dateOrdered;
    }

    public void setDateOrdered(Date dateOrdered) {
        this.dateOrdered = dateOrdered;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getShippingPrice() {
        return shippingPrice;
    }

    public void setShippingPrice(Double shippingPrice) {
        this.shippingPrice = shippingPrice;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDateReceived() {
        return dateReceived;
    }

    public void setDateReceived(Date dateReceived) {
        this.dateReceived = dateReceived;
    }
}
