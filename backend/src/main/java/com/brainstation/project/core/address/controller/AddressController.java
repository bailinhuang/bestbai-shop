package com.brainstation.project.core.address.controller;

import com.brainstation.project.core.address.service.AddressServiceImpl;
import com.brainstation.project.model.Address;
import com.brainstation.project.model.CustomResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RequestMapping(value = "/address")
@CrossOrigin
@RestController
public class AddressController {

    private AddressServiceImpl addressService;

    @Autowired
    public AddressController(AddressServiceImpl addressService) {
        this.addressService = addressService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<CustomResponse> getUserAddresses(@RequestParam String userId){
        List<Address> addressList  = addressService.getUserAddresses(userId);
        CustomResponse response = new CustomResponse(addressList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> addUserAddress(@RequestParam String userId, @RequestBody Address address){
            address  = addressService.addNewAddress(userId, address);
        CustomResponse response = new CustomResponse(address);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/{addressId}", method = RequestMethod.DELETE)
    public ResponseEntity<CustomResponse> deleteUserAddress(@PathVariable  String id, @PathVariable String addressId){
        boolean deleted = addressService.deleteUserAddress(id, addressId);
        CustomResponse response = new CustomResponse(deleted);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/{addressId}", method = RequestMethod.POST)
    public ResponseEntity<CustomResponse> editUserAddress(@RequestParam String id, @RequestParam Address address){
        Address returnedAddress = addressService.editUserAddress(id, address);
        CustomResponse response = new CustomResponse(returnedAddress);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
