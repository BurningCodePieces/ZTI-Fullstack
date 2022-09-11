package com.example.Project.api;

import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import com.example.Project.service.ShelterService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1")
public class ShelterApiController implements ShelterApi{
    @Autowired
    private ShelterService shelterService;

    @Override
    public ResponseEntity<List<ShelterDto>> getShelters() {
        return shelterService.getAllShelters();
    }

    @Override
    public ResponseEntity<ShelterDto> getShelter(Long shelterId) {
        return shelterService.getShelter(shelterId);
    }

    @Override
    public ResponseEntity<ShelterDto> addShelter(ShelterDto shelterDto) {
        return shelterService.addShelter(shelterDto);
    }

    @Override
    public ResponseEntity<PetDto> assignPetToShelter(Long shelterId, Long petId) throws NotFoundException {
        return shelterService.assignShelterToPet(shelterId, petId);
    }

    @Override
    public ResponseEntity<PetDto> deletePetShelterAssignment(Long petId) throws NotFoundException {
        return shelterService.removeShelterAssignmentFromPet(petId);
    }
}
