package com.dent.dent.entities;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Data

public class StudentPWKey implements Serializable {
    private int idStudentPw;
    private int student;
    private int pw;
}
