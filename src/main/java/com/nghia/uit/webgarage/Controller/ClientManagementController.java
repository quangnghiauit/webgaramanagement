package com.nghia.uit.webgarage.Controller;

import com.nghia.uit.webgarage.Model.ClientDTO;
import com.nghia.uit.webgarage.Model.Users;
import com.nghia.uit.webgarage.Service.ClientManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/clientmanagement")
public class ClientManagementController {

    @Autowired
    private ClientManagementService clientManagementService;

    @GetMapping(value = "/getallclient")
    public @ResponseBody
    ResponseEntity<?> getAllClient() {
        return new ResponseEntity<>(clientManagementService.getAllClient(), HttpStatus.OK);
    }

    @GetMapping(value = "/getinfoclient")
    public @ResponseBody
    ResponseEntity<?> getinfoClient(@RequestParam String userID) {
        return new ResponseEntity<>(clientManagementService.getInfoUser(userID), HttpStatus.OK);
    }

    @RequestMapping(value = "/addclient", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> addclient(@RequestBody ClientDTO users) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(clientManagementService.addClient(users,currentUser), HttpStatus.OK);
    }

    @RequestMapping(value = "/updateclient", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> updateClient(@RequestBody ClientDTO user, @RequestParam String userID) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(clientManagementService.updateClient(user, userID,currentUser), HttpStatus.OK);
    }

    @RequestMapping(value = "/deleteclient", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteClient(@RequestParam String userID) {
        return new ResponseEntity<>(clientManagementService.deleteClient(userID), HttpStatus.OK);
    }
}
