package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Bean.ResponseDTO;
import com.nghia.uit.webgarage.Model.AdminUsersDTO;
import com.nghia.uit.webgarage.Model.Roles;

import javax.management.relation.Role;
import java.util.List;

public interface AdminManagementService {

    List<Roles> getRole();

    ResponseDTO addRole(String role);

    ResponseDTO deleteRole(String role);

    List<AdminUsersDTO> getUsers();

    AdminUsersDTO getInfoUser(String userID);

    ResponseDTO addUsers(AdminUsersDTO adminUsersDTO,String currentUser);

    ResponseDTO updateUsers(AdminUsersDTO adminUsersDTO,String userID,String currentUser);

    ResponseDTO deleteUsers(String userID);

}
