package com.example.Project.dto;

import com.example.Project.common.PetType;
import com.example.Project.database.entity.Shelter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Null;

@Builder
@Data
@AllArgsConstructor
public class DonateDto {
    @Null
    private Long id;
    private long petId;
    private long userId;
    private Double money;
}
