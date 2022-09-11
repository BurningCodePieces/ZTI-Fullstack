package com.example.Project.database.entity;

import com.example.Project.database.entity.BaseEntity;
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
@Table(name = DbConst.TablesNames.SHELTER,  indexes = {@Index(name = "shelter_idx", columnList = Shelter.Fields.id, unique = true)})
public class Shelter extends BaseEntity {
    @Column
    private String name;

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String location;

    public Shelter(String name, String location) {
        this.name = name;
        this.location = location;
    }
}
