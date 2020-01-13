package com.nghia.uit.webgarage.Controller;

import com.nghia.uit.webgarage.Model.Car;
import com.nghia.uit.webgarage.Model.ClientDTO;
import com.nghia.uit.webgarage.Service.CarManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/carmanagement")
public class CarManagementController {

    @Autowired
    private CarManagementService carManagementService;

    @GetMapping(value = "/get-all-car")
    public @ResponseBody
    ResponseEntity<?> getAllCar() {
        return new ResponseEntity<>(carManagementService.getDataCar(), HttpStatus.OK);
    }

    @GetMapping(value = "/get-list-car-by-userID")
    public @ResponseBody
    ResponseEntity<?> getAllCar(@RequestParam String userID) {
        return new ResponseEntity<>(carManagementService.getListCarByUserID(userID), HttpStatus.OK);
    }

    @GetMapping(value = "/get-list-car-handling-by-userID")
    public @ResponseBody
    ResponseEntity<?> getAllCarHandlingByUserID(@RequestParam String userID) {
        return new ResponseEntity<>(carManagementService.getAllCarHandlingByUserID(userID), HttpStatus.OK);
    }



    @GetMapping(value = "/getcarhandling")
    public @ResponseBody
    ResponseEntity<?> getAllCarHandling() {
        return new ResponseEntity<>(carManagementService.getCarHandling(), HttpStatus.OK);
    }


    @RequestMapping(value = "/addcar",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> addCar(@RequestBody Car car,@RequestParam String userID) {
        return new ResponseEntity<>(carManagementService.addCar(car,userID),HttpStatus.OK);
    }

    @RequestMapping(value = "/processstatus",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> processstatus(@RequestParam String id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(carManagementService.processStatusCar(id,currentUser),HttpStatus.OK);
    }

    @RequestMapping(value = "/processdonestatus",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> processdonestatus(@RequestParam String id) {
        return new ResponseEntity<>(carManagementService.processDoneStatusCar(id),HttpStatus.OK);
    }

    @RequestMapping(value = "/updatecar",method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> updateCar(@RequestBody ClientDTO clientDTO,@RequestParam String licensePlate) {
        return new ResponseEntity<>(carManagementService.updateCar(clientDTO,licensePlate),HttpStatus.OK);
    }

    @RequestMapping(value = "/deletecar", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteCar(@RequestParam String licensePlate) {
        return new ResponseEntity<>(carManagementService.deleteCar(licensePlate), HttpStatus.OK);
    }

}
