package com.example.Project.service;

import com.example.Project.database.entity.User;
import com.example.Project.dto.UserDto;
import com.example.Project.dto.UsernameDto;
import com.example.Project.dto.UsernameMoneyDto;

import java.util.List;

public interface UserService {
    List<User> getUsers();
    User saveUser(UserDto userDto);
    void addRoleToUser(UsernameDto username);
    void chargeAccount(UsernameMoneyDto usernameMoneyDto);
    User getUser(String username);
}
