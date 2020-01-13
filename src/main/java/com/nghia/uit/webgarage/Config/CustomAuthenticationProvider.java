package com.nghia.uit.webgarage.Config;

import com.nghia.uit.webgarage.Service.Impl.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        try {
            // su dung userDetailService de lay thong tin user
            UserDetails user = userDetailsServiceImpl.loadUserByUsername(authentication.getName());
            //login xac thuc user
            UsernamePasswordAuthenticationToken result = null;
            if (user.getUsername().equals(authentication.getName()) && passwordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {

                result = new UsernamePasswordAuthenticationToken(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            return result;
        } catch (UsernameNotFoundException e) {
            throw e;
        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
