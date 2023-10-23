package com.serdar.regapp.vehicle;

import java.util.List;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.serdar.regapp.shared.GenericMessage;
import com.serdar.regapp.shared.Messages;
import com.serdar.regapp.vehicle.dto.request.CreateVehicleRequest;
import com.serdar.regapp.vehicle.dto.request.UpdateVehicleRequest;
import com.serdar.regapp.vehicle.dto.response.VehicleResponse;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/vehicles")
@AllArgsConstructor
public class VehicleController {

	private VehicleService vehicleService;

	// DEFAULT DEGERI AYRI BIR DOSYADA TUT!
	@GetMapping
	public Page<Vehicle> getVehicles(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size) {
		return vehicleService.getVehicles(page, size);
	}
	
	@GetMapping("/query")
	public Page<Vehicle> getVehicleByQuery(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(name = "query") String query){
		System.out.println(query);
		return vehicleService.getVehicleByQuery(page, size, query);
	}
	
	@GetMapping("/user-vehicles/{userId}")
	public List<Vehicle> getUserVehicles(@PathVariable Long userId) {
		
		return vehicleService.getUserVehicles(userId);
	}

	@PostMapping()
	public ResponseEntity<?> addVehicle(@Valid @RequestBody CreateVehicleRequest createVehicleRequest,
			@RequestParam(name = "userId") long userId) {

		vehicleService.addVehicle(createVehicleRequest, userId);

		String message = Messages.getMessageForLocale("regapp.create.vehicle.success.message",
				LocaleContextHolder.getLocale());

		return ResponseEntity.ok(new GenericMessage(message));
	}

	@GetMapping("/{id}")
	public VehicleResponse getVehicleById(@PathVariable Long id) {
		var vehicle = vehicleService.getVehicleById(id);
		return vehicle;
	}

	@PutMapping("/{vehicleId}")
	public ResponseEntity<?> updateVehicle(@PathVariable Long vehicleId,
			@Valid @RequestBody UpdateVehicleRequest updateVehicleRequest,
			@RequestHeader(name = "Authorization", required = false) String authorizationHeader) {

		vehicleService.updateVehicle(vehicleId, updateVehicleRequest, authorizationHeader);
		return ResponseEntity.ok().body("Vehicle successfully updated");
	}

	@DeleteMapping("/{vehicleId}")
	public ResponseEntity<?> deleteVehicleById(@PathVariable Long vehicleId) {
		vehicleService.deleteVehicleById(vehicleId);
		return ResponseEntity.ok().body("Vehicle successfully deleted!");
	}
}
