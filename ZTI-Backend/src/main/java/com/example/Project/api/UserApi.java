package com.example.Project.api;

import com.example.Project.common.UserRole;
import com.example.Project.database.entity.User;
import com.example.Project.dto.UserDto;
import com.example.Project.dto.UsernameDto;
import com.example.Project.dto.UsernameMoneyDto;
import com.example.Project.exception.handler.ErrorDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "USER")
@RequestMapping("/api")
@ApiResponses(value = {
        @ApiResponse(code = 400, message = "Bad request", response = ErrorDto.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = ErrorDto.class),
        @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
public interface UserApi {
    @ApiOperation(value = "", notes = "List all users")
    @GetMapping(value = "/user")
    ResponseEntity<List<User>> getUsers();

    @ApiOperation(value = "", notes = "Register user")
    @PostMapping(value = "/register")
    ResponseEntity<User> registerUser(@RequestBody UserDto userDto);

    @ApiOperation(value = "", notes = "Update user role")
    @PutMapping(value = "/updateRole")
    ResponseEntity<?> updateUserRole(@RequestBody UsernameDto usernameDto);


    @ApiOperation(value = "", notes = "Add role to user")
    @GetMapping(value = "/getUser")
    ResponseEntity<?> getUser(@RequestHeader(name="Authorization") String token);

    @ApiOperation(value = "", notes = "Charge user account")
    @PutMapping(value = "/chargeAccount")
    ResponseEntity<?> chargeAccount(@RequestBody UsernameMoneyDto usernameMoneyDto);
}
