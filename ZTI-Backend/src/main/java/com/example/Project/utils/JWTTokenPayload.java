package com.example.Project.utils;

import com.example.Project.common.UserRole;
import lombok.Data;

import java.util.ArrayList;

@Data
public class JWTTokenPayload {
    String sub;
    ArrayList<UserRole> roles;
    String iss;
}
