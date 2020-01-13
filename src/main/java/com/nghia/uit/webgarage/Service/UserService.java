package com.nghia.uit.webgarage.Service;

import com.nghia.uit.webgarage.Model.UserRole;
import com.nghia.uit.webgarage.Repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRoleRepository userRoleRepository;

    public List<String> getRolesByUserName(String userName) {
        List<String> rolesOfCurrentUser = new ArrayList<>();
        if(!StringUtils.isEmpty(userName)) {
            List<UserRole> userRoles = userRoleRepository.findByUserName(userName);
            if(!CollectionUtils.isEmpty(userRoles)) {
                rolesOfCurrentUser = userRoles.stream().map(UserRole::getRole).collect(Collectors.toList());
            }
        }
        return rolesOfCurrentUser;
    }
}
