package com.example.Project.service.impl;

import com.example.Project.common.UserRole;
import com.example.Project.database.entity.User;
import com.example.Project.database.repository.ShelterRepository;
import com.example.Project.database.repository.UserRepository;
import com.example.Project.dto.UserDto;
import com.example.Project.dto.UsernameDto;
import com.example.Project.dto.UsernameMoneyDto;
import com.example.Project.mapper.UserMapper;
import com.example.Project.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.lang.StrictMath.round;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {
    @Autowired
    private ShelterRepository shelterRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUsers(){
        return userRepository.findAll();
    }
     public User saveUser(UserDto userDto){
        User user = userMapper.map(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setUserRole(UserRole.STANDARD);
        user.setMoney(0.0);
        return userRepository.save(user);
     }

    @Override
    public void addRoleToUser(UsernameDto username) {
        User user = userRepository.findByUsername(username.getUsername());
        user.setUserRole(user.getUserRole() == UserRole.ADMIN ? UserRole.STANDARD : UserRole.ADMIN);
    }

    @Override
    public void chargeAccount(UsernameMoneyDto usernameMoneyDto) {
        User user = userRepository.findByUsername(usernameMoneyDto.getUsername());
        Double accountMoney = (user.getMoney() + usernameMoneyDto.getMoney());
        user.setMoney(Math.round(accountMoney*100.0)/100.0);
    }

    @Override
    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            log.error("USER IS NOT FOUND IN DATABASE");
        } else{
            log.info("USER " + username + " FOUND IN DATABASE");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getUserRole().name()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }
}
