package com.example.Project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Builder
@Data
public class ShelterDto {
    @NotNull(message = "Field name is null")
    @NotEmpty(message = "Field name is empty")
    private String name;
    @Null
    private Long id;
    @NotNull(message = "Field location is null")
    @NotEmpty(message = "Field location is empty")
    private String location;
}
