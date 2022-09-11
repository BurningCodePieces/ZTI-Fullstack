package com.example.Project.database.entity;

import com.example.Project.common.UserRole;
import lombok.*;
import lombok.experimental.FieldNameConstants;

import javax.persistence.*;

@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@FieldNameConstants
@Entity
@Table(name = "UsersTable")
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity{
    @Id
    @GeneratedValue
    private Long id;

    private Double money;

    private UserRole userRole;

    @Column(nullable = false, unique = true)
    private String username;

    @Column
    private String password;
}
