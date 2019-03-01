package com.brainstation.project.core.user.dto;

import com.brainstation.project.model.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "user")
public class UserDTO {

    @Id
    private String id;

    @Indexed(unique=true)
    private String email;

    private String name;
    private String password;
    private int phone;
    private int prefix;
    private boolean active;

    public UserDTO(){};

    public UserDTO(String name, String email, String password){
        this.name = name;
        this.email = email;
        this.password = password;
        this.active = true;
    };

    public UserDTO(String name, String email, String password, int phone, int prefix){
        this(name, email, password);
        this.phone = phone;
        this.prefix = prefix;
    };

    public void editUserDTO(User user){
        this.email = user.getEmail();
        this.name = user.getName();
        this.prefix = user.getPrefix();
        this.prefix = user.getPhone();
        this.active = user.isActive();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
