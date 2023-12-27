package com.dent.dent.services;


import com.dent.dent.IDao.IDao;
import com.dent.dent.entities.Groupe;
import com.dent.dent.repositories.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class GroupeService implements IDao<Groupe> {
    @Autowired
    GroupRepository repisitory;
    @Override
    public Groupe create(Groupe o) {
        return repisitory.save(o);
    }

    @Override
    public Groupe update(Groupe o) {
        return repisitory.save(o);
    }

    @Override
    public Boolean delete(Groupe o) {
        try {
            repisitory.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Groupe findById(int id) {
        return repisitory.findById((long) id).orElse(null);
    }

    @Override
    public List<Groupe> findAll() {
        return repisitory.findAll();
    }
}
