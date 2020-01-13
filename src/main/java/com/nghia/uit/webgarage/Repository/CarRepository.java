package com.nghia.uit.webgarage.Repository;

import com.nghia.uit.webgarage.Model.Car;
import com.nghia.uit.webgarage.Model.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends CrudRepository<Car, Integer> {

    @Query(value = "select * from car", nativeQuery = true)
    List<Car> findAllByFilter();

    @Query(value = "select * from car as c where c.userID =?1",nativeQuery = true)
    List<Car> findCarByUserID(long userID);

    @Query(value = "select * from car as c where c.userID =?1 and c.status = 1",nativeQuery = true)
    List<Car> findCarHandlingByUserID(String userID);

    @Query(value = "select * from car as c where c.id =?1",nativeQuery = true)
    Car findCarById(String id);

    @Query(value = "select * from car as c where c.status =1",nativeQuery = true)
    List<Car> findCarHandling();


    @Query(value = "select * from car as c where c.licensePlate =?1",nativeQuery = true)
    Car findCarByLicensePlate(String licensePlate);

}
