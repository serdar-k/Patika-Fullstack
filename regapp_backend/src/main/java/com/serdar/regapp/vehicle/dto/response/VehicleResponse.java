package com.serdar.regapp.vehicle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleResponse {

    private Long id;
    private String brand;
    private String model;
    private Integer modelYear;
    private String plate;
    private String vehicleName;
}
