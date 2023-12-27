package com.dent.dent.services;

import com.dent.dent.IDao.IDao;
import com.dent.dent.entities.Professor;
import com.dent.dent.repositories.ProfessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfessorService implements IDao<Professor> {
    @Autowired
    ProfessorRepository repisitory;
    @Override
    public Professor create(Professor o) {
        return repisitory.save(o);
    }

    @Override
    public Professor update(Professor o) {
        return repisitory.save(o);
    }

    @Override
    public Boolean delete(Professor o) {
        try {
            repisitory.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Professor findById(int id) {
        return repisitory.findById((long) id).orElse(null);
    }

    @Override
    public List<Professor> findAll() {
        return repisitory.findAll();
    }
}