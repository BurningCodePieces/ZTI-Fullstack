package com.example.Project.api;


import com.example.Project.dto.DonateDto;
import com.example.Project.dto.IDDto;
import com.example.Project.dto.PetDto;
import com.example.Project.service.DonateService;
import com.example.Project.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.bind.ValidationException;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1")
public class DonateApiController implements DonateApi {
    @Autowired
    private DonateService donateService;

    @Override
    public ResponseEntity<DonateDto> addDonate(DonateDto donateDto) throws IOException, ValidationException {
        return donateService.addDonate(donateDto);
    }

    @Override
    public ResponseEntity<List<DonateDto>> getDonates() throws IOException {
        return donateService.getDonates();
    }


}
