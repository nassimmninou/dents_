package com.dent.dent.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity

public class Professor extends User{
    private String grade;

    @OneToMany
    private List<Group> groups=new ArrayList<>();

}
