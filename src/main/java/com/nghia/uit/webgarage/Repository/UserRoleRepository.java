package com.nghia.uit.webgarage.Repository;

import com.nghia.uit.webgarage.Model.UserRole;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRoleRepository extends CrudRepository<UserRole, Integer> {

    @Query(value = "select * from user_role as u where u.userName =?1", nativeQuery = true)
    List<UserRole> findByUserName(String userName);

    @Query(value = "select * from user_role as u where u.role = 'CLIENT'", nativeQuery = true)
    List<UserRole> findUserNameByRoleClient();

    @Query(value = "select * from user_role as u where u.role not in ('CLIENT')", nativeQuery = true)
    List<UserRole> findUserNameByNotClient();





}
