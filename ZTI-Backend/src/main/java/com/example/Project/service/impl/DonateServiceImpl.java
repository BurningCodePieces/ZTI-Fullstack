package com.example.Project.service.impl;

import com.example.Project.database.entity.Donate;
import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.Shelter;
import com.example.Project.database.entity.User;
import com.example.Project.database.repository.DonateRepository;
import com.example.Project.database.repository.PetRepository;
import com.example.Project.database.repository.ShelterRepository;
import com.example.Project.database.repository.UserRepository;
import com.example.Project.dto.DonateDto;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import com.example.Project.exception.NotFoundException;
import com.example.Project.mapper.DonateMapper;
import com.example.Project.mapper.PetMapper;
import com.example.Project.mapper.ShelterMapper;
import com.example.Project.service.DonateService;
import com.example.Project.service.ShelterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolationException;
import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class DonateServiceImpl implements DonateService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private DonateRepository donateRepository;

    @Autowired
    private DonateMapper donateMapper;



    @Override
    @Transactional
    public ResponseEntity<DonateDto> addDonate(DonateDto donateDto) throws IOException, ValidationException {
        Optional<User> user = userRepository.findById(donateDto.getUserId());
        if(user.isEmpty()){
            throw new NotFoundException("User with given id not found");
        }

        Optional<Pet> pet = petRepository.findById(donateDto.getPetId());
        if(pet.isEmpty()){
            throw new NotFoundException("Pet with given id not found");
        }

        User userEntity = user.get();
        Pet petEntity = pet.get();
        if(donateDto.getMoney() > userEntity.getMoney()){
            throw new NotFoundException("Not enough money on account");
        }

        Optional<Donate> existingDonate = donateRepository.findByPetIdAndUserId(petEntity.getId(), userEntity.getId());
        if(existingDonate.isEmpty()) {
            Donate donate = new Donate(null, userEntity, petEntity, donateDto.getMoney());
            Donate savedDonate = donateRepository.save(donate);
            userEntity.setMoney(Math.round((userEntity.getMoney() - donate.getMoney()) * 100.0) / 100.0);
            userRepository.save(userEntity);
            return ResponseEntity.ok(donateMapper.map(savedDonate));
        }
        else{
            Donate donate = existingDonate.get();
            donate.setMoney(Math.round((donate.getMoney() + donateDto.getMoney())* 100.0)/100.0);
            userEntity.setMoney(Math.round((userEntity.getMoney() - donateDto.getMoney()) * 100.0) / 100.0);
            userRepository.save(userEntity);
            Donate savedDonate = donateRepository.save(donate);
            return ResponseEntity.ok(donateMapper.map(savedDonate));
        }
    }

    @Override
    public ResponseEntity<List<DonateDto>> getDonates() {
        List<Donate> donateList = donateRepository.findAll();
        List<DonateDto> donateDtos = new ArrayList<>();
        donateList.forEach(x->donateDtos.add(donateMapper.map(x)));
        return ResponseEntity.ok(donateDtos);
    }
}
