package com.brainstation.project.model;

import com.brainstation.project.core.user.dto.UserDTO;

public class User {

    private String id;
    private String email;
    private String name;
    private String password;
    private int phone;
    private int prefix;
    private boolean active;

    public User(){}

    public User(String id, String email, String name, String password, boolean active){
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.active = active;
    }

    public User(String id, String email, String name, String password, boolean active, int phone, int prefix){
        this(id, email, name, password, active);
        this.phone = phone;
        this.prefix = prefix;
    }

    public User(UserDTO userDTO){
        this(userDTO.getId(), userDTO.getEmail(), userDTO.getName(),
                null, userDTO.isActive(), userDTO.getPhone(), userDTO.getPrefix());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public int getPrefix() {
        return prefix;
    }

    public void setPrefix(int prefix) {
        this.prefix = prefix;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
