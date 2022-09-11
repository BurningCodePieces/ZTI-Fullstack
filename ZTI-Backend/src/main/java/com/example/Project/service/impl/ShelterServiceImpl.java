package com.example.Project.service.impl;

import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.Shelter;
import com.example.Project.database.repository.PetRepository;
import com.example.Project.database.repository.ShelterRepository;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import com.example.Project.exception.NotFoundException;
import com.example.Project.mapper.PetMapper;
import com.example.Project.mapper.ShelterMapper;
import com.example.Project.service.ShelterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ShelterServiceImpl implements ShelterService{
    @Autowired
    private ShelterRepository shelterRepository;

    @Autowired
    private ShelterMapper shelterMapper;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private PetMapper petMapper;

    public ResponseEntity<ShelterDto> addShelter(ShelterDto shelterDto){
        Shelter shelter = shelterMapper.map(shelterDto);
        Shelter savedEntity = shelterRepository.save(shelter);
        return ResponseEntity.ok(shelterMapper.map(savedEntity));
    }
    public ResponseEntity<List<ShelterDto>> getAllShelters(){
        List<Shelter> shelterList = shelterRepository.findAll();
        return ResponseEntity.ok(shelterList.stream().map(shelter -> shelterMapper.map(shelter)).toList());
    }
    public ResponseEntity<ShelterDto> getShelter(Long id){
        Optional<Shelter> shelter = shelterRepository.findById(id);
        if(shelter.isEmpty()){
            throw new NotFoundException("Shelter with given id does not exist.");
        }
        return ResponseEntity.ok(shelterMapper.map(shelter.get()));
    }
    public ResponseEntity<Void> deleteShelter(Long id) throws NotFoundException {
        Optional<Shelter> shelter = shelterRepository.findById(id);
        if(shelter.isEmpty()){
            throw new NotFoundException("Shelter with given id does not exist.");
        }
        shelterRepository.delete(shelter.get());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    public ResponseEntity<PetDto> assignShelterToPet(Long petId, Long shelterId) throws NotFoundException {
        Optional<Shelter> shelter = shelterRepository.findById(shelterId);
        Optional<Pet> pet = petRepository.findById(petId);

        if(shelter.isEmpty()){
            throw new NotFoundException("Shelter with given id does not exist.");
        } else if (pet.isEmpty()) {
            throw new NotFoundException("Pet with given id does not exist.");
        }
        Pet petEntity = pet.get();
        petEntity.setShelter(shelter.get());
        return ResponseEntity.ok(petMapper.map(petEntity));
    }
    public ResponseEntity<PetDto> removeShelterAssignmentFromPet(Long petId) throws NotFoundException {
        Optional<Pet> pet = petRepository.findById(petId);

        if (pet.isEmpty()) {
            throw new NotFoundException("Pet with given id does not exist.");
        }
        Pet petEntity = pet.get();
        petEntity.setShelter(null);
        return ResponseEntity.ok(petMapper.map(petEntity));
    };
}
