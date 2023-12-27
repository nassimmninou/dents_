package com.dent.dent.services;


import com.dent.dent.IDao.IDao;
import com.dent.dent.entities.Groupe;
import com.dent.dent.entities.Student;
import com.dent.dent.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class StudentService implements IDao<Student> {
    @Autowired
    StudentRepository repisitory;
    @Override
    public Student create(Student o) {
        return repisitory.save(o);
    }

    @Override
    public Student update(Student o) {
        return repisitory.save(o);
    }

    @Override
    public Boolean delete(Student o) {
        try {
            repisitory.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Student findById(int id) {
        return repisitory.findById((long) id).orElse(null);
    }

    @Override
    public List<Student> findAll() {
        return repisitory.findAll();
    }

    public List<Student> findStudentsByGroupe(Groupe groupe) {
        return repisitory.findStudentsByGroupe(groupe);
    }

}
