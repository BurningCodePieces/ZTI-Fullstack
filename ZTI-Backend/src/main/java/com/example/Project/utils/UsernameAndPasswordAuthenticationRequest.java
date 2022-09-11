package com.example.Project.utils;

import lombok.Data;
@Data
public class UsernameAndPasswordAuthenticationRequest {
    private String email;
    private String password;
}