package com.example.Project.api;

import com.example.Project.dto.DonateDto;
import com.example.Project.dto.IDDto;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import com.example.Project.exception.handler.ErrorDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;

@Api(tags = "Donate")
@ApiResponses(value = {
        @ApiResponse(code = 400, message = "Bad request", response = ErrorDto.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = ErrorDto.class),
        @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
public interface DonateApi {
    @ApiOperation(value = "", notes = "Add new donate")
    @PutMapping(value = "/donate")
    ResponseEntity<DonateDto> addDonate(@RequestBody DonateDto donateDto) throws IOException, ValidationException;

    @ApiOperation(value = "", notes = "Get all donates")
    @GetMapping(value = "/donate")
    ResponseEntity<List<DonateDto>> getDonates() throws IOException;

}
