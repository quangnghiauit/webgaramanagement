package com.nghia.uit.webgarage.RestAPI;

import com.nghia.uit.webgarage.Config.CustomWebAuthenticationDetails;
import com.nghia.uit.webgarage.Message.Constants;
import com.nghia.uit.webgarage.Model.UserRole;
import com.nghia.uit.webgarage.Model.Users;
import com.nghia.uit.webgarage.Repository.UserRepository;
import com.nghia.uit.webgarage.Repository.UserRoleRepository;
import com.nghia.uit.webgarage.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@CrossOrigin
@Controller
public class LoginAPI {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;



    protected CustomWebAuthenticationDetails getUserSession() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null ? (CustomWebAuthenticationDetails) auth.getDetails() : null;
    }


    @CrossOrigin
    @RequestMapping(value = "/api/auth/getID", method = RequestMethod.GET)
    public ResponseEntity<?> getUserID() {
        CustomWebAuthenticationDetails user = getUserSession();
        String userName = "";
        if (user != null) {
            userName = user.getUsername();
        }
        Users users = userRepository.findByUserName(userName);
        ResponseEntity<?> userID = new ResponseEntity<>(users, HttpStatus.OK);
        return userID;

    }


    @CrossOrigin
    @RequestMapping(value = "/api/role",method = RequestMethod.GET)
    public ResponseEntity<String>  roles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return  new ResponseEntity<>(authentication.getAuthorities().toString(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/api/auth/get-roles-of-current-user", method = RequestMethod.GET)
    public ResponseEntity<?> getConfigForCreateTicketPage() {
        CustomWebAuthenticationDetails user = getUserSession();
        String userName = user != null ? user.getUsername() : Constants.DEV_USER;
        return new ResponseEntity<>(userService.getRolesByUserName(userName), HttpStatus.OK);
    }



    @CrossOrigin
    @GetMapping(value = "/api/auth")
    public ResponseEntity<String> auth() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("\n\n\n\n\n\n"+auth+"\n\n\n\n\n\n\n");
        //auth.getCredentials()

        return new ResponseEntity<String>(auth.getAuthorities().toString(),HttpStatus.OK);

    }
}
