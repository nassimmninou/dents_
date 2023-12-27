package com.dent.dent.controllers;

import com.dent.dent.entities.Groupe;
import com.dent.dent.services.GroupeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/groupes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class GroupeController {
    @Autowired
    private GroupeService service;

    @GetMapping
    public List<Groupe> findAllGroupes(){
        return service.findAll();
    }
    @PostMapping
    public Groupe createGroupe(@RequestBody Groupe Groupe){
       // Groupe.setId((long) 0);
        return service.create(Groupe);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable int id) {
        Groupe Groupe = service.findById(id);
        if (Groupe==null) {
            return new ResponseEntity<Object>("la Groupe avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(Groupe);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateGroupe(@PathVariable int id, @RequestBody Groupe newGroupe){
        Groupe Groupe = service.findById(id);
        if (Groupe==null) {
            return new ResponseEntity<Object>("le Groupe avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            newGroupe.setId(id);
            return ResponseEntity.ok(service.update(newGroupe));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteGroupe(@PathVariable int id){
        Groupe Groupe = service.findById(id);
        if (Groupe==null) {
            return new ResponseEntity<Object>("le Groupe avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(service.delete(Groupe));
        }
    }



}