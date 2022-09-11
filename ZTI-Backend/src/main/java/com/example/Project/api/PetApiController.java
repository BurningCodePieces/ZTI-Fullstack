package com.example.Project.api;


import com.example.Project.dto.IDDto;
import com.example.Project.dto.PetDto;
import com.example.Project.service.PetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1")
@Slf4j
public class PetApiController implements PetApi {
    @Autowired
    private PetService petService;

    @Override
    public ResponseEntity<List<PetDto>> getPets() {
        return petService.getAllPets();
    }

    @Override
    public ResponseEntity<PetDto> getPet(Long petId) {
        return petService.getPet(petId);
    }

    @Override
    public ResponseEntity<PetDto> addPet(PetDto petDto) throws IOException {
        return petService.addPet(petDto);
    }

    @Override
    public ResponseEntity<PetDto> deletePet(Long id) throws IOException {
        petService.deletePet(id);
        return ResponseEntity.ok().build();
    }
}
