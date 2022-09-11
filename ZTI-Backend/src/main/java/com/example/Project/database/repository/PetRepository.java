package com.example.Project.database.repository;

import com.example.Project.database.entity.Pet;
import com.example.Project.database.entity.Shelter;
import com.example.Project.database.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PetRepository extends CrudRepository<Pet, Long> {
    List<Pet> findAll();
}
