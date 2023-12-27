package com.dent.dent.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Groupe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String code;
    private String year;
    @ManyToOne
    private Professor professor;
    @OneToMany
    private List<Student> student;
    @ManyToMany
    private List<PW> pws;

}
