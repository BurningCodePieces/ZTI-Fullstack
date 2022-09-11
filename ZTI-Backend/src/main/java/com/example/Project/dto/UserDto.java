package com.example.Project.dto;

import com.example.Project.common.UserRole;
import com.example.Project.database.entity.Shelter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Builder
@Data
@AllArgsConstructor
public class UserDto {
    @Null
    private Long id;

    @Null
    private UserRole userRole;

    private Double money;

    @NotNull(message = "Field name is null")
    @NotEmpty(message = "Field name is empty")
    private String userName;

    @NotNull(message = "Field password is null")
    @NotEmpty(message = "Field password is empty")
    private String password;


    private Shelter shelter;
}
