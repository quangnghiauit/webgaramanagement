package com.nghia.uit.webgarage.Controller;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.AdminUsersDTO;
import com.nghia.uit.webgarage.Model.ClientDTO;
import com.nghia.uit.webgarage.Repository.RoleRepository;
import com.nghia.uit.webgarage.Repository.UserRepository;
import com.nghia.uit.webgarage.Repository.UserRoleRepository;
import com.nghia.uit.webgarage.Service.AdminManagementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/api/adminmanagement")
public class AdminManagementController {

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AdminManagementService adminManagementService;

    @GetMapping(value = "/get-role")
    public @ResponseBody
    ResponseEntity<?> getRole() {
        return new ResponseEntity<>(adminManagementService.getRole(), HttpStatus.OK);
    }

    @RequestMapping(value = "/add-role",method = RequestMethod.POST)
    public @ResponseBody ResponseEntity<?> addrole(@RequestParam String role) {
        return new ResponseEntity<>(adminManagementService.addRole(role),HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-role",method = RequestMethod.DELETE)
    public @ResponseBody ResponseEntity<?> deleterole(@RequestParam String role) {
        return new ResponseEntity<>(adminManagementService.deleteRole(role),HttpStatus.OK);
    }

    @GetMapping(value = "/get-users")
    public @ResponseBody
    ResponseEntity<?> getUsers() {
        return new ResponseEntity<>(adminManagementService.getUsers(), HttpStatus.OK);
    }

    @GetMapping(value = "/get-info-users")
    public @ResponseBody
    ResponseEntity<?> getinfoUsers(@RequestParam String userID) {
        return new ResponseEntity<>(adminManagementService.getInfoUser(userID), HttpStatus.OK);
    }

    @RequestMapping(value = "/add-user", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> addUser(@RequestBody AdminUsersDTO users) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(adminManagementService.addUsers(users,currentUser), HttpStatus.OK);
    }
    @RequestMapping(value = "/update-user", method = RequestMethod.POST)
    public @ResponseBody
    ResponseEntity<?> updateUser(@RequestBody AdminUsersDTO user, @RequestParam String userID) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUser= auth.getName();
        return new ResponseEntity<>(adminManagementService.updateUsers(user, userID,currentUser), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete-user", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@RequestParam String userID) {
        return new ResponseEntity<>(adminManagementService.deleteUsers(userID), HttpStatus.OK);
    }
}
