package com.homeassist.backend.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private User user;
    private String provider;
    private String serviceType;
    private String date;
    private String status;
    private String review;
    private String address;
    private String time;
    public Booking() {
    }
    public Booking(User user, String provider, String serviceType, String date, String time, String address, String status, String review) {
        this.user = user;
        this.provider = provider;
        this.serviceType = serviceType;
        this.date = date;
        this.time = time;
        this.address = address;
        this.status = status;
        this.review = review;
    }

}