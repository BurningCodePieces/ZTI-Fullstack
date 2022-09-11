package com.example.Project.api;


import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import com.example.Project.exception.handler.ErrorDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags = "Shelter")
@ApiResponses(value = {
        @ApiResponse(code = 400, message = "Bad request", response = ErrorDto.class),
        @ApiResponse(code = 401, message = "Unauthorized", response = ErrorDto.class),
        @ApiResponse(code = 500, message = "Internal Server Error", response = ErrorDto.class)})
public interface ShelterApi {
    @ApiOperation(value = "", notes = "List all shelters")
    @GetMapping(value = "/shelter")
    ResponseEntity<List<ShelterDto>> getShelters();

    @ApiOperation(value = "", notes = "Get shelter by id")
    @GetMapping(value = "/shelter/{id}")
    ResponseEntity<ShelterDto> getShelter(@PathVariable(value = "id") Long shelterId);

    @ApiOperation(value = "", notes = "Add new shelter")
    @PostMapping(value = "/shelter")
    ResponseEntity<ShelterDto> addShelter(@RequestBody ShelterDto shelterDto);

    @ApiOperation(value = "", notes = "Assign pet to shelter")
    @PutMapping(value = "/shelter/{shelterId}/assignPet/{petId}")
    ResponseEntity<PetDto> assignPetToShelter(@PathVariable(value = "shelterId") Long shelterId, @PathVariable(value = "petId") Long petId) throws NotFoundException;

    @ApiOperation(value = "", notes = "Delete shelter assignment from pet")
    @PutMapping(value = "/shelter/removePetAssignment/{petId}")
    ResponseEntity<PetDto> deletePetShelterAssignment(@PathVariable(value = "petId") Long petId) throws NotFoundException;
}
