package com.dent.dent.services;


import com.dent.dent.IDao.IDao;
import com.dent.dent.entities.Tooth;
import com.dent.dent.repositories.ToothRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToothService implements IDao<Tooth> {
    @Autowired
    ToothRepository repisitory;
    @Override
    public Tooth create(Tooth o) {
        return repisitory.save(o);
    }

    @Override
    public Tooth update(Tooth o) {
        return repisitory.save(o);
    }

    @Override
    public Boolean delete(Tooth o) {
        try {
            repisitory.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Tooth findById(int id) {
        return repisitory.findById((long) id).orElse(null);
    }

    @Override
    public List<Tooth> findAll() {
        return repisitory.findAll();
    }
}
