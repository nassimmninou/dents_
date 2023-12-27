package com.dent.dent.repositories;

import com.dent.dent.entities.Groupe;
import com.dent.dent.entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

    @Query("select s from Student s where s.group = ?1")
    public List<Student> findStudentsByGroupe(Groupe groupe);
}

