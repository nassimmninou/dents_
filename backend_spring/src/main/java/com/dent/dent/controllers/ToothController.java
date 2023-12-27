package com.dent.dent.controllers;

import com.dent.dent.entities.Tooth;
import com.dent.dent.services.ToothService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/tooths")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})

public class ToothController {
    @Autowired
    private ToothService service;

    @GetMapping
    public List<Tooth> findAllTooths(){
        return service.findAll();
    }
    @PostMapping
    public Tooth createTooth(@RequestBody Tooth Tooth){
        // Tooth.setId((long) 0);
        return service.create(Tooth);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable int id) {
        Tooth Tooth = service.findById(id);
        if (Tooth==null) {
            return new ResponseEntity<Object>("la Tooth avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(Tooth);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTooth(@PathVariable int id, @RequestBody Tooth newTooth){
        Tooth Tooth = service.findById(id);
        if (Tooth==null) {
            return new ResponseEntity<Object>("le Tooth avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            newTooth.setId((long) id);
            return ResponseEntity.ok(service.update(newTooth));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTooth(@PathVariable int id){
        Tooth tooth = service.findById(id);
        if (tooth==null) {
            return new ResponseEntity<Object>("le Tooth avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(service.delete(tooth));
        }
    }



}