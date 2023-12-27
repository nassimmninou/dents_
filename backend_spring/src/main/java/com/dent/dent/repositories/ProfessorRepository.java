package com.dent.dent.repositories;

import com.dent.dent.entities.Groupe;
import com.dent.dent.entities.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor, Long> {
    public List<Professor> findProfessorByGroup(Groupe groupe);
}
