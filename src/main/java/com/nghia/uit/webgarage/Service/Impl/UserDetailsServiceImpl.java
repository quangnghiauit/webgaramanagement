package com.nghia.uit.webgarage.Service.Impl;

import com.nghia.uit.webgarage.Model.UserRole;
import com.nghia.uit.webgarage.Model.Users;
import com.nghia.uit.webgarage.Repository.UserRepository;
import com.nghia.uit.webgarage.Repository.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        logger.debug("Loading loginUser by userName: {}", username);

        Users users = userRepository.findByUserName(username);
        logger.debug("Found loginUser: {}", users);

        if (users == null) {
            throw new UsernameNotFoundException("No loginUser found with UserName: " + username);
        }

        List<UserRole> userRoles = userRoleRepository.findByUserName(username);
        List<GrantedAuthority> list = new ArrayList<>();
        for(UserRole userRole :userRoles) {
            list.add(new SimpleGrantedAuthority("ROLE_"+userRole.getRole()));
        }

        User princial = new User(username,users.getPassword(),true,true,true,true,list);
        logger.debug("Returning loginUser details: {}",princial);
        return princial;
    }
}
