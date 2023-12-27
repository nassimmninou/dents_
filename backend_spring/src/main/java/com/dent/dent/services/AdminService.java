package com.dent.dent.services;

import com.dent.dent.IDao.IDao;
import com.dent.dent.entities.Admin;
import com.dent.dent.repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService implements IDao<Admin> {
    @Autowired
    AdminRepository repisitory;
    @Override
    public Admin create(Admin o) {
        return repisitory.save(o);
    }

    @Override
    public Admin update(Admin o) {
        return repisitory.save(o);
    }

    @Override
    public Boolean delete(Admin o) {
        try {
            repisitory.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public Admin findById(int id) {
        return repisitory.findById((long) id).orElse(null);
    }

    @Override
    public List<Admin> findAll() {
        return repisitory.findAll();
    }
}
