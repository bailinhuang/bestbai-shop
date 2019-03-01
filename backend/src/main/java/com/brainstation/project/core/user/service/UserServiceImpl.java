package com.brainstation.project.core.user.service;

import com.brainstation.project.core.user.dao.UserDAO;
import com.brainstation.project.core.user.dto.UserDTO;
import com.brainstation.project.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public List<User> getAllUsers() {
        List<UserDTO> userDTOList = userDAO.findAll();
        ArrayList<User> userArrayList = new ArrayList<>();
        userDTOList.forEach(userDTO -> userArrayList.add(
                new User(userDTO.getId(),
                        userDTO.getEmail(),
                        userDTO.getName(),
                        null,
                        userDTO.isActive(),
                        userDTO.getPhone(),
                        userDTO.getPrefix())
        ));
        return userArrayList;
    }

    public User getUser(String email) {
        try {
            List<UserDTO> userDTO = userDAO.findByEmail(email);
            if (userDTO != null) {
                return new User(userDTO.get(0));
            } else {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public User addUser(User user) {
        UserDTO userDTO = new UserDTO(
                user.getName(),
                user.getEmail(),
                user.getPassword(),
                user.getPhone(),
                user.getPrefix()
        );
        userDAO.save(userDTO);
        user.setId(userDTO.getId());
        return user;
    }

    public User editUser(User user) {
        UserDTO userDTO = userDAO.findById(user.getId()).orElse(null);
        if (userDTO != null) {
            userDTO.editUserDTO(user);
            userDAO.save(userDTO);
            return user;
        } else {
            return null;
        }
    }

    public User deleteUser(String id) {
        return null;
    }
}
