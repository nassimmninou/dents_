package com.dent.dent.repositories;

import com.dent.dent.entities.Groupe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository  extends JpaRepository<Groupe,Long> {
}