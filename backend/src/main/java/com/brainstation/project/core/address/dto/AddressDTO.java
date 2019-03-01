package com.brainstation.project.core.address.dto;

import com.brainstation.project.model.Address;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(value = "address")
public class AddressDTO {

    @Id
    private String id;
    private String userId;

    private List<Address> addresses;

    public AddressDTO() {
        addresses = new ArrayList<>();
    }

    public AddressDTO(String id, String userId, List<Address> addresses) {
        this.id = id;
        this.userId = userId;
        this.addresses = addresses;
    }

    public AddressDTO(String userId, Address address) {
        this();
        this.userId = userId;
        addresses.add(address);
    }

    public AddressDTO(String userId) {
        this();
        this.userId = userId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public List<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<Address> addresses) {
        this.addresses = addresses;
    }
}
