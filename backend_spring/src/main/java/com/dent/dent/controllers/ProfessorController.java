package com.dent.dent.controllers;


import com.dent.dent.entities.Professor;
import com.dent.dent.entities.Professor;
import com.dent.dent.services.ProfessorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.CharBuffer;
import java.util.List;


@RestController
@RequestMapping("/api/v1/professors")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})

public class ProfessorController {
    @Autowired
    private ProfessorService service;

    @GetMapping
    public List<Professor> findAllProfessors(){
        return service.findAll();
    }
    @PostMapping
    public Professor createProfessor(@RequestBody Professor Professor){
        //Professor.setId((int) 0);
        return service.create(Professor);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable int id) {
        Professor Professor = service.findById(id);
        if (Professor==null) {
            return new ResponseEntity<Object>("la Professor avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(Professor);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProfessor(@PathVariable int id, @RequestBody Professor newProfessor){
        Professor Professor = service.findById(id);
        if (Professor==null) {
            return new ResponseEntity<Object>("le Professor avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            newProfessor.setId((long) id);
            return ResponseEntity.ok(service.update(newProfessor));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProfessor(@PathVariable int id){
        Professor Professor = service.findById(id);
        if (Professor==null) {
            return new ResponseEntity<Object>("le Professor avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(service.delete(Professor));
        }
    }











}
