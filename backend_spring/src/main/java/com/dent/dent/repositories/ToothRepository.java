package com.dent.dent.repositories;

import com.dent.dent.entities.Tooth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ToothRepository extends JpaRepository<Tooth,Long> {
}
