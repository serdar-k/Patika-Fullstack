package com.serdar.regapp.user.dto.response;

import com.serdar.regapp.user.Role;

import com.serdar.regapp.vehicle.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long id;

    private String username;

    private String email;
    
    private Role role;

    private List<Vehicle> vehicles;

}
