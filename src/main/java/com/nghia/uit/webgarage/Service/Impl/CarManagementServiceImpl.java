package com.nghia.uit.webgarage.Service.Impl;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Message.Constants;
import com.nghia.uit.webgarage.Model.*;
import com.nghia.uit.webgarage.Repository.CarRepository;
import com.nghia.uit.webgarage.Repository.RepairBillRepository;
import com.nghia.uit.webgarage.Repository.UserRepository;
import com.nghia.uit.webgarage.Service.CarManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CarManagementServiceImpl implements CarManagementService {

    public final static Logger logger = LoggerFactory.getLogger(CarManagementServiceImpl.class);

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RepairBillRepository repairBillRepository;


    @Override
    public List<ClientDTO> getDataCar() {
        try{
            List<Car> carList = carRepository.findAllByFilter();
            if(carList.size()==0) {
                return new ArrayList<>();
            }
            Users users;
            List<ClientDTO> clientDTOList = new ArrayList<>();
            for(Car car :carList) {
                ClientDTO clientDTO = new ClientDTO();
                users = userRepository.findByUserID(String.valueOf(car.getUserID()));
                if(users!=null) {
                    clientDTO.setDisplayname(users.getDisplayname());
                    clientDTO.setPhoneNumber(users.getPhoneNumber());
                }
                clientDTO.setStatus(String.valueOf(car.getStatus()));
                clientDTO.setLicensePlate(car.getLicensePlate());
                clientDTO.setId(car.getId());
                clientDTO.setUserID(car.getUserID());
                clientDTOList.add(clientDTO);
            }
            return clientDTOList;
        }catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<CarDTO> getCarHandling() {
        try {
            List<CarDTO> carDTOList = new ArrayList<>();
            List<Car> list = carRepository.findCarHandling();

            if(list.size()==0) {
                return new ArrayList<>();
            }

            Users users = new Users();
            for(Car car : list) {
                CarDTO carDTO = new CarDTO();
                carDTO.setId(car.getId());
                carDTO.setLicensePlate(car.getLicensePlate());
                carDTO.setStatus(car.getStatus());
                users = userRepository.findByUserID(String.valueOf(car.getUserID()));
                if(users!=null) {
                    carDTO.setDisplayName(users.getDisplayname());
                }
                carDTOList.add(carDTO);
            }
            return carDTOList;
        } catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Car> getListCarByUserID(String userID) {
        try {
            if (userID.isEmpty()) {
                return new ArrayList<>();

            }
            List<Car> list = carRepository.findCarByUserID(Long.valueOf(userID));
            if (list.size() == 0) {
                return new ArrayList<>();

            }
            return list;
        } catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public List<Car> getAllCarHandlingByUserID(String userID) {
        try {
            if (userID.isEmpty() || Objects.isNull(userID)) {
                return new ArrayList<>();

            }
            List<Car> list = carRepository.findCarHandlingByUserID(userID);
            if (list.size() == 0) {
                return new ArrayList<>();

            }
            return list;
        } catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public ResponseDTO addCar(Car car, String userID) {
        try {
            if (String.valueOf(userID) != null) {
                if(!car.getLicensePlate().isEmpty()) {
                    Car carByLicensePlate = carRepository.findCarByLicensePlate(car.getLicensePlate());
                    if(carByLicensePlate !=null) {
                        return new ResponseDTO().fail("Biển số này đã tồn tại.");
                    }
                }
                car.setStatus(Constants.INIT_PROCESS);
                car.setUserID(Long.valueOf(userID));
                carRepository.save(car);
                return new ResponseDTO().success(Constants.DONE_ADDREQUESTCAR);
            }

        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
        return null;
    }

    @Override
    public ResponseDTO processStatusCar(String id,String currentUser) {
        try {

            Car car = carRepository.findCarById(id);
            car.setStatus(Constants.PROCESSING);
            carRepository.save(car);
            RepairBill repairBill = new RepairBill();
            repairBill.setCreatedBy(currentUser);
            repairBill.doMappingRepairBill(car.getLicensePlate(), car.getUserID());
            repairBill.setStatus(Constants.PROCESSING);
            repairBillRepository.save(repairBill);
            return new ResponseDTO().success(Constants.PROCESSING_MESSAGE);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

    @Override
    public ResponseDTO processDoneStatusCar(String id) {
        try {

            Car car = carRepository.findCarById(id);
            car.setStatus(Constants.DONE_PROCESS);
            carRepository.save(car);
            return new ResponseDTO().success(Constants.DONE_PROCESSMESSAGE);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

    @Override
    public ResponseDTO updateCar(ClientDTO clientDTO, String licensePlate) {
        try {
            Car car = carRepository.findCarByLicensePlate(licensePlate);
            Users user = userRepository.findByUserID(String.valueOf(car.getUserID()));
            //saveCarMapping(clientDTO, user, car);
            return new ResponseDTO().success(Constants.DONE_UPDATEREQUESTCAR);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }

    }

    @Override
    public ResponseDTO deleteCar(String licensePlate) {
        try {
            Car car = carRepository.findCarByLicensePlate(licensePlate);
            carRepository.delete(car);
            return new ResponseDTO().success(Constants.DONE_DELETEREQUESTCAR);
        } catch (Exception ex) {
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

//    public ClientDTO saveCarMapping(ClientDTO clientDTO, Users users, Car car) {
//        ClientDTO entity = new ClientDTO();
//        users.doMappingClientDTO(clientDTO);
//        car.doMappingCar(clientDTO);
//        userRepository.save(users);
//        carRepository.save(car);
//        entity.doMappingClientDTO(users, car);
//        return entity;
//    }
}
