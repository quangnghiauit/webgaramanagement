package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.Car;
import com.nghia.uit.webgarage.Model.CarDTO;
import com.nghia.uit.webgarage.Model.ClientDTO;

import java.util.List;

public interface CarManagementService {

    List<ClientDTO> getDataCar();

    List<CarDTO> getCarHandling();

    List<Car> getListCarByUserID(String userID);

    List<Car> getAllCarHandlingByUserID(String userID);

    ResponseDTO addCar(Car car,String userID);

    ResponseDTO processStatusCar(String id,String currentUser);

    ResponseDTO processDoneStatusCar(String id);

    ResponseDTO updateCar(ClientDTO clientDTO,String licensePlate);

    ResponseDTO deleteCar(String licensePlate);
}
