package com.brainstation.project.core.address.dao;

import com.brainstation.project.core.address.dto.AddressDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AddressDAO extends MongoRepository<AddressDTO, String> {

    public AddressDTO findByUserId(String userId);
}
