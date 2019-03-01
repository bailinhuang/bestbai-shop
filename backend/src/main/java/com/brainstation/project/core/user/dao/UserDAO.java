package com.brainstation.project.core.user.dao;

import com.brainstation.project.core.user.dto.UserDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserDAO extends MongoRepository<UserDTO, String>{

    List<UserDTO> findByEmail(String email);
}
