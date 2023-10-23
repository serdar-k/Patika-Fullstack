package com.serdar.regapp.vehicle;

import com.serdar.regapp.config.JwtService;
import com.serdar.regapp.user.User;
import com.serdar.regapp.user.UserRepository;
import com.serdar.regapp.utils.mappers.MapperService;
import com.serdar.regapp.vehicle.dto.request.CreateVehicleRequest;
import com.serdar.regapp.vehicle.dto.request.UpdateVehicleRequest;
import com.serdar.regapp.vehicle.dto.response.VehicleResponse;
import com.serdar.regapp.vehicle.exception.NotUniquePlateException;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class VehicleService {

    private MapperService mapperService;
    private VehicleRepository vehicleRepository;
    private UserRepository userRepository;
    private JwtService jwtService;

    public Page<Vehicle> getVehicles(int page, int size) {
        return vehicleRepository.findAll(PageRequest.of(page, size));
    }

    public void addVehicle(CreateVehicleRequest createVehicleRequest, Long userId) {
        try {
        	Optional<User> user = userRepository.findById(userId);
            Vehicle vehicle = this.mapperService.forRequest().map(createVehicleRequest, Vehicle.class);
            vehicle.setUser(user.get());
            vehicleRepository.save(vehicle);
		} catch (Exception ex) {
			throw new NotUniquePlateException();
		}
    }

    public VehicleResponse getVehicleById(Long id) {
        var vehicle = vehicleRepository.findById(id).orElse(null);
        var vehicleResponse = VehicleResponse.builder().id(vehicle.getId()).brand(vehicle.getBrand()).model(vehicle.getModel()).modelYear(vehicle.getModelYear()).plate(vehicle.getPlate()).vehicleName(vehicle.getVehicleName()).build();
        return vehicleResponse;
    }

    public void deleteVehicleById(Long vehicleId) {
        vehicleRepository.deleteById(vehicleId);
    }

    public void updateVehicle(Long vehicleId, UpdateVehicleRequest updateVehicleRequest, String header) {
        Vehicle vehicleToUpdate = mapperService.forRequest().map(updateVehicleRequest, Vehicle.class);
        vehicleToUpdate.setId(vehicleId);
        var username = jwtService.extractUsername(header.substring(7));
        System.out.println(username);
        User user = userRepository.findByUsername(username).get();
        vehicleToUpdate.setUser(user);
        // SAVE ICERISINDE ID BILGISI OLAN VERIYI (BURADA VEHICLE ICIN ID BIR UST SATIRDA SET EDILDI) UPDATE EDER
        vehicleRepository.save(vehicleToUpdate);
    }

	public List<Vehicle> getUserVehicles(Long userId) {
		return vehicleRepository.findAllByUserId(userId);
	}

	public Page<Vehicle> getVehicleByQuery(int page, int size, String query) {
		return vehicleRepository.findAll(PageRequest.of(page, size), query);
	}
}
