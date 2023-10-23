package com.serdar.regapp.vehicle.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.serdar.regapp.vehicle.validation.UniquePlate;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateVehicleRequest {

    @NotBlank(message = "Car name can not be blank!")
    @Size(min = 3, max = 20, message = "Car name must be between 3 and 20 characters!")
    private String vehicleName;

    @NotBlank(message = "Brand can not be blank!")
    @Size(min = 3, max = 20, message = "Brand must be between 3 and 20 characters!")
    private String brand;

    @NotBlank(message = "Model can not be blank!")
    @Size(min = 3, max = 20, message = "Model must be between 3 and 20 characters!")
    private String model;

    @NotNull
//    @PastOrPresent(message = "Model year must be present or past!")
    private Integer modelYear;

    @NotBlank
    @UniquePlate
    @Pattern(regexp = "^[0-9]{1,2}-[A-Z]{1,3}-[0-9]{1,4}$")
    private String plate;

    private Long userId;
}
