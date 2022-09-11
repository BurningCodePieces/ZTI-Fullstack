package com.example.Project.database.entity;

import lombok.*;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@FieldNameConstants
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Donate extends BaseEntity{
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private User user;

    @ManyToOne
    private Pet pet;

    @Column
    private Double money;
}
