package com.example.Project.exception.handler;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorDto {
    private String errorCode;
    private String message;
}

