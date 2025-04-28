package com.homeassist.backend.repository;

import com.homeassist.backend.model.Booking;
import com.homeassist.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
}