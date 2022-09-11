package com.example.Project.database.repository;

import com.example.Project.database.entity.Shelter;
import com.example.Project.database.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ShelterRepository extends CrudRepository<Shelter, Long> {
    List<Shelter> findAll();
}
