package com.example.Project.service;

import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ShelterService {
    ResponseEntity<ShelterDto> addShelter(ShelterDto shelterDto);
    ResponseEntity<List<ShelterDto>> getAllShelters();
    ResponseEntity<ShelterDto> getShelter(Long id);
    ResponseEntity<Void> deleteShelter(Long id) throws NotFoundException;
    ResponseEntity<PetDto> assignShelterToPet(Long petId, Long shelterId) throws NotFoundException;
    ResponseEntity<PetDto> removeShelterAssignmentFromPet(Long petId) throws NotFoundException;
}
