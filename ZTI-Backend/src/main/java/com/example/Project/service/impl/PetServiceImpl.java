package com.example.Project.service.impl;

import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.Shelter;
import com.example.Project.database.repository.PetRepository;
import com.example.Project.dto.IDDto;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import com.example.Project.exception.NotFoundException;
import com.example.Project.mapper.PetMapper;
import com.example.Project.service.PetService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class PetServiceImpl implements PetService {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PetMapper petMapper;

    public ResponseEntity<PetDto> addPet(PetDto petDto) throws IOException {
        Pet pet = petRepository.save(petMapper.map(petDto));
        return ResponseEntity.ok(petMapper.map(pet));
    }

    @Override
    public ResponseEntity<List<PetDto>> getAllPets() {
        List<Pet> petList = petRepository.findAll();
        return ResponseEntity.ok(petList.stream().map(pet -> petMapper.map(pet)).toList());
    }

    @Override
    public ResponseEntity<PetDto> getPet(Long id) {
        Optional<Pet> pet = petRepository.findById(id);
        if(pet.isEmpty()){
            throw new NotFoundException("Pet with given id does not exist.");
        }
        return ResponseEntity.ok(petMapper.map(pet.get()));
    }

    @Override
    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }


}
