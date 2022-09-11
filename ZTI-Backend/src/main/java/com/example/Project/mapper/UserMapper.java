package com.example.Project.mapper;

import com.example.Project.database.entity.Shelter;
import com.example.Project.database.entity.User;
import com.example.Project.dto.ShelterDto;
import com.example.Project.dto.UserDto;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserDto map(User user) {
        return UserDto.builder().id(user.getId())
                .userName(user.getUsername())
                .password(user.getPassword())
                .userRole(user.getUserRole()).money(user.getMoney())
                .build();
    }

    public User map(UserDto userDto){
        return new User(userDto.getId(), userDto.getMoney(), userDto.getUserRole(), userDto.getUserName(), userDto.getPassword());
    }
}
