package com.homeassist.backend.controller;

import com.homeassist.backend.model.Booking;
import com.homeassist.backend.model.User;
import com.homeassist.backend.repository.BookingRepository;
import com.homeassist.backend.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import java.nio.charset.StandardCharsets;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final String SECRET_KEY = "your-secret-key"; // Match the secret key from UserController

    public BookingController(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/my-bookings")
    public ResponseEntity<?> getUserBookings(@RequestHeader("Authorization") String token) {
        try {
            // Extract email from JWT token
            String email = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()  // THIS WAS MISSING
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();

            User user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                    put("message", "Invalid token");
                }});
            }

            List<Booking> bookings = bookingRepository.findByUser(user);
            return ResponseEntity.ok(bookings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                put("message", "Invalid or expired token");
            }});
        }
    }
}