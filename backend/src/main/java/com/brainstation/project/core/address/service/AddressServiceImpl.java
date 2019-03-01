package com.brainstation.project.core.address.service;

import com.brainstation.project.core.address.dao.AddressDAO;
import com.brainstation.project.core.address.dto.AddressDTO;
import com.brainstation.project.model.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    private AddressDAO addressDAO;

    @Autowired
    public AddressServiceImpl(AddressDAO addressDAO) {
        this.addressDAO = addressDAO;
    }

    public List<Address> getUserAddresses(String userId){
        AddressDTO addressDTO =  addressDAO.findByUserId(userId);
        return addressDTO.getAddresses();
    }

    public void addAddress(String userId){
        AddressDTO addressDTO = new AddressDTO(userId);
        addressDAO.save(addressDTO);
    }

    public Address addNewAddress(String userId, Address address){
        AddressDTO addressDTO;
        try{
            addressDTO = addressDAO.findByUserId(userId);
        } catch (Exception e){
            addressDTO = new AddressDTO(userId, address);
            System.out.println(e);
        }
        addressDTO.getAddresses().add(address);
        addressDAO.save(addressDTO);
        return address;
    }

    public Address editUserAddress(String userId, Address address){
        AddressDTO addressDTO =  addressDAO.findByUserId(userId);
        Address returnedAddress =  addressDTO.getAddresses().stream().filter(addr -> addr.getId().equals(address.getId())).findFirst().orElse(null);
        if(returnedAddress != null){
            address.setId(returnedAddress.getId());
            addressDTO.getAddresses().remove(returnedAddress);
            addressDTO.getAddresses().add(address);
            addressDAO.save(addressDTO);
            return address;
        } else {
            return null;
        }
    }

    public boolean deleteUserAddress(String userId, String addressId){
        AddressDTO addressDTO =  addressDAO.findByUserId(userId);
        Address returnedAddress =  addressDTO.getAddresses().stream().filter(address -> address.getId().equals(addressId)).findFirst().orElse(null);
        if(returnedAddress != null){
            addressDTO.getAddresses().remove(returnedAddress);
            addressDAO.save(addressDTO);
            return true;
        } else {
            return false;
        }
    }
}
