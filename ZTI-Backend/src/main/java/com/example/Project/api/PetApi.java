package com.example.Project.api;

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
import java.io.IOException;
import java.util.List;

@Api(tags = "Pet")
@ApiResponses(value = {
        @ApiResponse(code = 400, message = "Bad request", response = ErrorDto.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = ErrorDto.class),
        @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
public interface PetApi {
    @ApiOperation(value = "", notes = "List all pets")
    @GetMapping(value = "/pet")
    ResponseEntity<List<PetDto>> getPets();

    @ApiOperation(value = "", notes = "Get pet by id")
    @GetMapping(value = "/pet/{id}")
    ResponseEntity<PetDto> getPet(@PathVariable(value = "id") Long petId);

    @ApiOperation(value = "", notes = "Add new pet")
    @PostMapping(value = "/pet")
    ResponseEntity<PetDto> addPet(@RequestBody PetDto petDto) throws IOException;

    @ApiOperation(value = "", notes = "Delete pet")
    @DeleteMapping(value = "/pet/{id}")
    ResponseEntity<PetDto> deletePet(@PathVariable Long id) throws IOException;
}
