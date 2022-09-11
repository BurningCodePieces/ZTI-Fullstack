package com.example.Project.database.repository;

import com.example.Project.database.entity.Donate;
import com.example.Project.database.entity.Shelter;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface DonateRepository extends CrudRepository<Donate, Long> {
    Optional<Donate> findByPetIdAndUserId(Long petId, Long userId);
    List<Donate> findAll();
}
