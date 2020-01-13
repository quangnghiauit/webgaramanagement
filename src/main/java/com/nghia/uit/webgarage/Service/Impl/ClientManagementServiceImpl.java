package com.nghia.uit.webgarage.Service.Impl;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Message.Constants;
import com.nghia.uit.webgarage.Model.Car;
import com.nghia.uit.webgarage.Model.ClientDTO;
import com.nghia.uit.webgarage.Model.UserRole;
import com.nghia.uit.webgarage.Model.Users;
import com.nghia.uit.webgarage.Repository.CarRepository;
import com.nghia.uit.webgarage.Repository.UserRepository;
import com.nghia.uit.webgarage.Repository.UserRoleRepository;
import com.nghia.uit.webgarage.Service.ClientManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ClientManagementServiceImpl implements ClientManagementService {

    public static final Logger logger = LoggerFactory.getLogger(ClientManagementServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<ClientDTO> getAllClient() {
        try {
            List<UserRole> userRoleList = userRoleRepository.findUserNameByRoleClient();
            if (userRoleList.size() == 0) {
                return new ArrayList<>();
            }
            List<String> userNameClient = new ArrayList<>();
            for (UserRole userRole : userRoleList) {
                if (!userRole.getUsername().isEmpty()) {
                    userNameClient.add(userRole.getUsername());
                }
            }
            List<Users> usersList = userRepository.findAllByListUserName(userNameClient);
            if (usersList.size() == 0) {
                return new ArrayList<>();
            }

            List<ClientDTO> clientDTOS = new ArrayList<>();
            for (Users users : usersList) {
                ClientDTO client = new ClientDTO();
                client.doMappingUsers(users);
                clientDTOS.add(client);
            }
            return clientDTOS;
        } catch (Exception ex) {
            return new ArrayList<>();
        }

    }

    @Override
    public Users getInfoUser(String userID) {
        if(userID.isEmpty()) {
            return null;
        }
        Users users = userRepository.findByUserID(userID);
        return users;
    }



    @Override
    public ResponseDTO addClient(ClientDTO users,String userNameSec) {
        try {
            String userName = users.getUserName();
            if (userName != null) {
                Users users1 = userRepository.findByUserName(userName);
                if (users1 != null) {
                    return new ResponseDTO().fail(Constants.FAIL_EXISTSUSERS);
                }

                Users entity = new Users();
                entity.setPassword(passwordEncoder.encode(users.getPassword()));
                entity.setCreatedBy(userNameSec);
                entity.doMappingClientDTO(users);
                entity.setStatus(Constants.BILL_NO_HANDLE);

                UserRole userRole = new UserRole();
                userRole.setUsername(userName);
                userRole.setRole(Constants.CLIENT);
                userRepository.save(entity);
                userRoleRepository.save(userRole);
                return new ResponseDTO().success(Constants.DONE_ADDREQUESTUSERS);
            }

        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
        return null;
    }

    @Override
    public ResponseDTO updateClient(ClientDTO clientDTO, String userID,String userNameSec) {
        try {
            Users user = userRepository.findByUserID(userID);
            user.setUpdatedBy(userNameSec);
            user.doMappingUsers(clientDTO);
            userRepository.save(user);
            return new ResponseDTO().success(Constants.DONE_UPDATEREQUESTUSERS);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

    @Override
    public ResponseDTO deleteClient(String userID) {
        try {
            Users user = userRepository.findByUserID(userID);
            userRepository.delete(user);
            return new ResponseDTO().success(Constants.DONE_DELETEREQUESTUSERS);
        } catch (Exception ex) {
            return new ResponseDTO().fail(ex.getMessage());
        }
    }


}
