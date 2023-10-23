package com.serdar.regapp.vehicle;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.serdar.regapp.image.FileDetails;
import com.serdar.regapp.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "vehicles", uniqueConstraints = @UniqueConstraint(columnNames = {"plate"}))
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue
    private Long id;

    private String vehicleName;

    private String brand;

    private String model;

    private Integer modelYear;

    private String plate;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference(value = "user-vehicle")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @OneToMany(mappedBy = "vehicle")
    @JsonBackReference(value = "vehicle-image")
    private List<FileDetails> vehicleImage;
}
