package com.homeassist.backend.service;
import com.homeassist.backend.model.User;
public interface UserService {
    User registerUser(User user);
    User getUserById(Long id);
    User getUserByEmail(String email);
    boolean authenticateUser(String email, String password);
}