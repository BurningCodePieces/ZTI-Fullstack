package com.example.Project.mapper;

import com.example.Project.database.entity.Shelter;
import com.example.Project.dto.ShelterDto;
import org.springframework.stereotype.Component;

@Component
public class ShelterMapper {
    public ShelterDto map(Shelter shelter) {
        return ShelterDto.builder().id(shelter.getId())
                .name(shelter.getName())
                .location(shelter.getLocation())
                .build();
    }

    public Shelter map(ShelterDto shelterDto){
        return new Shelter(shelterDto.getName(), shelterDto.getLocation());
    }
}
