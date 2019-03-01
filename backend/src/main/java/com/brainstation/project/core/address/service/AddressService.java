package com.brainstation.project.core.address.service;

import com.brainstation.project.model.Address;
import java.util.List;

public interface AddressService {

    List<Address> getUserAddresses(String userId);

    Address addNewAddress(String userId, Address address);
}
