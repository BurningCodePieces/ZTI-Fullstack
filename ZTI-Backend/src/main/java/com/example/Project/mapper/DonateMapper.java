package com.example.Project.mapper;

import com.example.Project.database.entity.Donate;
import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.Shelter;
import com.example.Project.database.repository.PetRepository;
import com.example.Project.database.repository.ShelterRepository;
import com.example.Project.database.repository.UserRepository;
import com.example.Project.dto.DonateDto;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Component
public class DonateMapper {
@Autowired
PetRepository petRepository;

@Autowired
    UserRepository userRepository;
    public Donate map(DonateDto donateDto) throws IOException {
        return new Donate(donateDto.getId(),userRepository.getById(donateDto.getUserId()),petRepository.findById(donateDto.getPetId()).get(), donateDto.getMoney());
    }

    public DonateDto map(Donate donate){
        return DonateDto.builder()
                .id(donate.getId())
                .money(donate.getMoney())
                .userId(donate.getUser().getId())
                .petId(donate.getPet().getId())
                .build();
    }
}
