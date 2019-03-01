package com.brainstation.project.model;

import java.util.Date;
import java.util.UUID;

public class Card {

    private String id;
    private String type;
    private String name;
    private String number;
    private String securityNumber;
    private String expirationDate;

    public Card() {
        id = UUID.randomUUID().toString().replace("-", "");
    }

    public Card(String id, String type, String name, String number, String securityNumber, String expirationDate) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.number = number;
        this.securityNumber = securityNumber;
        this.expirationDate = expirationDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getSecurityNumber() {
        return securityNumber;
    }

    public void setSecurityNumber(String securityNumber) {
        this.securityNumber = securityNumber;
    }

    public String getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }
}
