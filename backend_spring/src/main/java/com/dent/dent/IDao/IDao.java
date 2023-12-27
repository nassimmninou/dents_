package com.dent.dent.IDao;

import java.util.List;

public interface IDao<T> {
    T create(T o);

    T update(T o);

    Boolean delete(T o);

    T findById(int id);

    List<T> findAll();

}
