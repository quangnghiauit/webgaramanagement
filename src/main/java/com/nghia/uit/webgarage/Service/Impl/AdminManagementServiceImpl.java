package com.nghia.uit.webgarage.Service.Impl;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Message.Constants;
import com.nghia.uit.webgarage.Model.AdminUsersDTO;
import com.nghia.uit.webgarage.Model.Roles;
import com.nghia.uit.webgarage.Model.UserRole;
import com.nghia.uit.webgarage.Model.Users;
import com.nghia.uit.webgarage.Repository.RoleRepository;
import com.nghia.uit.webgarage.Repository.UserRepository;
import com.nghia.uit.webgarage.Repository.UserRoleRepository;
import com.nghia.uit.webgarage.Service.AdminManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.List;

@Service
public class AdminManagementServiceImpl implements AdminManagementService {

    public static final Logger logger = LoggerFactory.getLogger(AdminManagementServiceImpl.class);

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public List<Roles> getRole() {
        try {
            List<Roles> list = roleRepository.getAllRoles();
            if (list.size() == 0) {
                return new ArrayList<>();
            }
            return list;
        } catch (Exception ex) {
            return new ArrayList<>();
        }
    }

    @Override
    public ResponseDTO addRole(String role) {
        try {
            Roles roles = new Roles(role);
            roleRepository.save(roles);
            return new ResponseDTO().success("Thêm thành công");

        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail("Thêm không thành công");
        }
    }


    @Override
    public ResponseDTO deleteRole(String role) {
        try {
            Roles roles = new Roles();
            roles = roleRepository.findByRole(role);
            if (roles == null) {
                return new ResponseDTO().fail("Xóa không thành công");
            }
            roleRepository.delete(roles);
            return new ResponseDTO().success("Xóa thành công");

        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail("Xóa không thành công");
        }
    }

    @Override
    public List<AdminUsersDTO> getUsers() {
        try {
            List<UserRole> userRoleList = userRoleRepository.findUserNameByNotClient();
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

            List<AdminUsersDTO> adminUsersDTOS = new ArrayList<>();
            UserRole userRole;
            for (Users users : usersList) {
                AdminUsersDTO adminUsersDTO = new AdminUsersDTO();
                userRole = userRoleRepository.findByUserName(users.getUserName()).get(0);
                adminUsersDTO.doMappingUsers(users, userRole);
                adminUsersDTOS.add(adminUsersDTO);
            }
            return adminUsersDTOS;


        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ArrayList<>();
        }
    }

    @Override
    public AdminUsersDTO getInfoUser(String userID) {
        if(userID.isEmpty()) {
            return null;
        }
        Users users = userRepository.findByUserID(userID);
        AdminUsersDTO adminUsersDTO = new AdminUsersDTO();
        UserRole userRole = userRoleRepository.findByUserName(users.getUserName()).get(0);
        adminUsersDTO.doMappingUsers(users, userRole);
        adminUsersDTO.setRole(userRole.getRole());
        return adminUsersDTO;

    }

    @Override
    public ResponseDTO addUsers(AdminUsersDTO adminUsersDTO, String currentUser) {
        try {
            String userName = adminUsersDTO.getUserName();
            if (userName != null) {
                Users users1 = userRepository.findByUserName(userName);
                if (users1 != null) {
                    return new ResponseDTO().fail(Constants.FAIL_EXISTSUSERS);
                }

                Users entity = new Users();
                entity.setPassword(passwordEncoder.encode(adminUsersDTO.getPassword()));
                entity.setCreatedBy(currentUser);
                entity.doMappingAdminUsersDTO(adminUsersDTO);
                UserRole userRole = new UserRole();
                userRole.setUsername(userName);
                userRole.setRole(adminUsersDTO.getRole());
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
    public ResponseDTO updateUsers(AdminUsersDTO adminUsersDTO, String userID, String currentUser) {
        try {
            Users user = userRepository.findByUserID(userID);
            UserRole userRole = userRoleRepository.findByUserName(user.getUserName()).get(0);
            if (!adminUsersDTO.getRole().isEmpty()) {
                userRole.setRole(adminUsersDTO.getRole());
                userRoleRepository.save(userRole);
            }
            user.setUpdatedBy(currentUser);
            user.doMappingUsersAdminUsersDTO(adminUsersDTO);
            userRepository.save(user);
            return new ResponseDTO().success(Constants.DONE_UPDATEREQUESTUSERS);
        } catch (Exception ex) {
            logger.error(ex.getMessage());
            return new ResponseDTO().fail(ex.getMessage());
        }
    }

    @Override
    public ResponseDTO deleteUsers(String userID) {
        try {
            Users user = userRepository.findByUserID(userID);
            UserRole userRole = userRoleRepository.findByUserName(user.getUserName()).get(0);
            userRoleRepository.delete(userRole);
            userRepository.delete(user);
            return new ResponseDTO().success(Constants.DONE_DELETEREQUESTUSERS);
        } catch (Exception ex) {
            return new ResponseDTO().fail(ex.getMessage());
        }
    }
}
