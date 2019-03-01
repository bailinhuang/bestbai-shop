package com.brainstation.project.model;

import com.brainstation.project.core.address.dto.AddressDTO;

import java.util.UUID;

public class Address {
    private String id;
    private String userId;
    private String country;
    private String province;
    private String city;
    private String street;
    private String zipcode;
    private String phone;

    public Address() {
        id = UUID.randomUUID().toString().replace("-", "");
    }

    public Address(String id, String userId, String country, String province, String city, String street, String zipcode, String phone) {
        this.id = id;
        this.userId = userId;
        this.country = country;
        this.province = province;
        this.city = city;
        this.street = street;
        this.zipcode = zipcode;
        this.phone = phone;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }
}
