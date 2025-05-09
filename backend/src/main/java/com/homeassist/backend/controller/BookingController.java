package com.homeassist.backend.controller;
import com.homeassist.backend.model.Booking;
import com.homeassist.backend.model.User;
import com.homeassist.backend.repository.BookingRepository;
import com.homeassist.backend.repository.UserRepository;
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
@CrossOrigin(origins="http://localhost:5173")
public class BookingController {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final String SECRET_KEY="temporary secret key, changes to be made later";
    public BookingController(BookingRepository bookingRepository, UserRepository userRepository) {
        this.bookingRepository=bookingRepository;
        this.userRepository=userRepository;
    }
    @GetMapping("/my-bookings")
    public ResponseEntity<?> getUserBookings(@RequestHeader("Authorization") String token) {
        try {
            String email=Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();
            User user=userRepository.findByEmail(email);
            if (user==null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                    put("message", "Invalid token");
                }});
            }
            List<Booking> bookings=bookingRepository.findByUser(user);
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
            String email=Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();
            User user=userRepository.findByEmail(email);
            if (user==null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                    put("message", "Invalid token");
                }});
            }
            booking.setUser(user);
            booking.setStatus("pending");
            Booking savedBooking=bookingRepository.save(booking);
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
            String email=Jwts.parserBuilder()
                    .setSigningKey(Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    .parseClaimsJws(token.replace("Bearer ", ""))
                    .getBody()
                    .getSubject();
            User user=userRepository.findByEmail(email);
            if (user==null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                    put("message", "Invalid token");
                }});
            }
            Booking booking = bookingRepository.findById(bookingId)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));
            if (!booking.getUser().getEmail().equals(email)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new HashMap<>() {{
                    put("message", "Not authorized to review this booking");
                }});
            }
            booking.setReview(reviewData.get("review"));
            Booking updatedBooking = bookingRepository.save(booking);
            return ResponseEntity.ok(updatedBooking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new HashMap<>() {{
                put("message", "Invalid or expired token");
            }});
        }
    }
}
