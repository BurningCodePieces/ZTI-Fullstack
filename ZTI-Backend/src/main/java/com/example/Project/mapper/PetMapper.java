package com.example.Project.mapper;

import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.Shelter;
import com.example.Project.database.repository.ShelterRepository;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Component
public class PetMapper {
    @Autowired
    ShelterRepository shelterRepository;
    public Pet map(PetDto petDto) throws IOException {
        Optional<Shelter> shelter = shelterRepository.findById(petDto.getShelterId());
        return new Pet(petDto.getName(),
                petDto.getId(),
                petDto.getPetType(),
                petDto.getAge(),
                petDto.getPicture(),
                shelter.isEmpty() ? null : shelter.get());
    }

    public PetDto map(Pet pet){
        Shelter shelter = pet.getShelter();
        return PetDto.builder()
                .name(pet.getName())
                .id(pet.getId())
                .petType(pet.getPetType())
                .age(pet.getAge())
                .shelterId(shelter == null ? 0 : shelter.getId())
                .picture(pet.getPicture())
                .build();
    }
}
