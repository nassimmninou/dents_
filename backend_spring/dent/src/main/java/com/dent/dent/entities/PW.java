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
public class PW {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;

    private String objectif;

    private String docs;

    @ManyToMany(mappedBy = "pws")
    private List<Group> groups=new ArrayList<>();

    @ManyToOne
    private Tooth tooth;

}
