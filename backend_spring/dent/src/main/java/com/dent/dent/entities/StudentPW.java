package com.dent.dent.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data

public class StudentPW {
    @EmbeddedId
    private StudentPWKey idStudentpw;

    @JoinColumn(name = "student", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne
    private Student student;
    @JoinColumn(name = "pw", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToOne
    private PW pw;

    private String time;


}
