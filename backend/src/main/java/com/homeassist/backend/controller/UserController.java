package com.homeassist.backend.controller;

import com.homeassist.backend.model.User;
import com.homeassist.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }
        userRepository.save(user);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Register successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());
        if (user == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        if (!user.getPassword().equals(loginRequest.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful");
        return ResponseEntity.ok(response);
    }
}