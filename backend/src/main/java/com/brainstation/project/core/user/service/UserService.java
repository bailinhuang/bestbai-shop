package com.brainstation.project.core.user.service;

import com.brainstation.project.model.User;

import java.util.List;

public interface UserService {

    public List<User> getAllUsers();

    public User getUser(String id);

    public User addUser(User user);

    public User editUser(User user);

    public User deleteUser(String id);
}
