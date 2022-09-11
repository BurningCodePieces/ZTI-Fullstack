package com.example.Project.service;

import com.example.Project.dto.IDDto;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface PetService {
    ResponseEntity<PetDto> addPet(PetDto petDto) throws IOException;
    ResponseEntity<List<PetDto>> getAllPets();
    ResponseEntity<PetDto> getPet(Long id);
    void deletePet(Long id);
}
