package com.example.Project.service;

import com.example.Project.dto.DonateDto;
import com.example.Project.dto.IDDto;
import com.example.Project.dto.PetDto;
import com.example.Project.dto.ShelterDto;
import org.springframework.http.ResponseEntity;

import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;

public interface DonateService {
    ResponseEntity<DonateDto> addDonate(DonateDto donateDto) throws IOException, ValidationException;
    ResponseEntity<List<DonateDto>> getDonates();
}
