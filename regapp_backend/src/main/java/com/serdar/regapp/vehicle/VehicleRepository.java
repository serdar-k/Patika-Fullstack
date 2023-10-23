package com.serdar.regapp.vehicle;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    
	Vehicle findByPlate(String plate);

	List<Vehicle> findAllByUserId(Long userId);
	
	@Query("FROM Vehicle v WHERE v.brand = :query OR  v.model = :query")
	Page<Vehicle> findAll(PageRequest of, @Param(value = "query") String query);
}
