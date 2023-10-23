package com.serdar.regapp.vehicle.validation;

import com.serdar.regapp.vehicle.Vehicle;
import com.serdar.regapp.vehicle.VehicleRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniquePlateValidator implements ConstraintValidator<UniquePlate, String> {

    @Autowired
    VehicleRepository vehicleRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        Vehicle vehicleInDatabase = vehicleRepository.findByPlate(value);
        return vehicleInDatabase == null;
    }
}
