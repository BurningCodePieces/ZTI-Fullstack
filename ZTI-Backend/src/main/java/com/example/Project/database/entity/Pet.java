package com.example.Project.database.entity;

import com.example.Project.common.PetType;
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
public class Pet extends BaseEntity{
    @Column
    private String name;

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private PetType petType;

    @Column
    private Integer age;

    @Column
    private String picture;

    @ManyToOne
    private Shelter shelter;
}
