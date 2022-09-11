package com.example.Project.database.entity;

import lombok.Data;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;
import java.util.UUID;

@Data
@MappedSuperclass
@FieldNameConstants
public abstract class BaseEntity {
    @Column(updatable = false, nullable = false)
    private Long creationTime;

    @Column(nullable = false)
    private Long updateTime;

    @PrePersist
    protected void preCreate() {
        creationTime = System.currentTimeMillis();
        updateTime = creationTime;
    }

    @PreUpdate
    protected void preUpdate() {
        updateTime = System.currentTimeMillis();
    }
}