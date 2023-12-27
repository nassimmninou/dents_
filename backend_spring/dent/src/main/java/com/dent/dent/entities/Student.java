package com.dent.dent.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity

public class Student extends User{

    private String number;

    @ManyToMany(mappedBy = "students")
    private List<Group> groups=new ArrayList<>();
}
