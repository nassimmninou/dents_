package com.dent.dent.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String code;
    private String year;

    @ManyToOne
    @JoinColumn(name = "id")
    private Professor professor;

    @ManyToMany(mappedBy = "groups")
    private List<Student> students=new ArrayList<>();

    @ManyToMany(mappedBy = "groups")
    private List<PW> pws=new ArrayList<>();

}
