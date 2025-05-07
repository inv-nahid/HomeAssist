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
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final String SECRET_KEY = "your-secret-key-should-be-very-long-and-secure-in-production";

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

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking, @RequestHeader("Authorization") String token) {
        try {
            // Extract email from JWT token
            String email = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();

            User user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                    put("message", "Invalid token");
                }});
            }

            // Set the user and default status
            booking.setUser(user);
            booking.setStatus("pending");

            // Save the booking
            Booking savedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(savedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                put("message", "Invalid or expired token");
            }});
        }
    }

    @PostMapping("/{bookingId}/review")
    public ResponseEntity<?> addReview(
            @PathVariable Long bookingId,
            @RequestBody Map<String, String> reviewData,
            @RequestHeader("Authorization") String token) {
        try {
            // Extract email from JWT token
            String email = Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();

            User user = userRepository.findByEmail(email);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                    put("message", "Invalid token");
                }});
            }

            // Find the booking
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            // Verify the booking belongs to the user
            if (!booking.getUser().getEmail().equals(email)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HashMap<>() {{
                    put("message", "Not authorized to review this booking");
                }});
            }

            // Update the review
            booking.setReview(reviewData.get("review"));
            Booking updatedBooking = bookingRepository.save(booking);

            // Return the updated booking with the review
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                put("message", "Invalid or expired token");
            }});
        }
    }
}