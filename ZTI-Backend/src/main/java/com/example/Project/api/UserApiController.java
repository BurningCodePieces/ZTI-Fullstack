package com.example.Project.api;

import com.example.Project.common.UserRole;
import com.example.Project.database.entity.User;
import com.example.Project.dto.UserDto;
import com.example.Project.dto.UsernameDto;
import com.example.Project.dto.UsernameMoneyDto;
import com.example.Project.mapper.UserMapper;
import com.example.Project.service.UserService;
import com.example.Project.utils.JWTTokenPayload;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import springfox.documentation.spring.web.json.Json;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/v1")
@Slf4j
public class UserApiController implements UserApi {
    @Autowired
    private UserService userService;

    @Override
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @Override
    public ResponseEntity<User> registerUser(UserDto userDto) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user").toUriString());
        return ResponseEntity
                .created(uri).body(userService.saveUser(userDto));
    }

    @Override
    public ResponseEntity<?> updateUserRole(UsernameDto username) {
        userService.addRoleToUser(username);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<?> getUser(String token) {
        token = token.substring(4);
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]), StandardCharsets.UTF_8);
        String payload = new String(decoder.decode(chunks[1]), StandardCharsets.UTF_8);
        Gson g = new Gson();
        JWTTokenPayload payload1 = g.fromJson(payload, JWTTokenPayload.class);
        String username = payload1.getSub();
        userService.getUser(username);
        return ResponseEntity.ok(userService.getUser(username));
    }

    @Override
    public ResponseEntity<?> chargeAccount(UsernameMoneyDto usernameMoneyDto) {
        userService.chargeAccount(usernameMoneyDto);
        return ResponseEntity.ok().build();
    }
}
