package com.dent.dent.controllers;


import com.dent.dent.entities.Groupe;
import com.dent.dent.entities.Student;
import com.dent.dent.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/api/v1/students")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class StudentsController {
    @Autowired
    private StudentService service;

    @GetMapping
    public List<Student> findAllstudents(){
        return service.findAll();
    }
    @PostMapping
    public Student createstudent(@RequestBody Student student){
        //student.setId((int) 0);
        return service.create(student);
    }
    ///ilyas_mobile
    @PostMapping("/signup")
    public ResponseEntity<Object> signup(@RequestBody Student student) {

        Student createdStudent = service.create(student);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);}

    /////
    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable int id) {
        Student student = service.findById(id);
        if (student==null) {
            return new ResponseEntity<Object>("la student avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(student);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updatestudent(@PathVariable int id, @RequestBody Student newstudent){
        Student student = service.findById(id);
        if (student==null) {
            return new ResponseEntity<Object>("le student avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            newstudent.setId((long) id);
            return ResponseEntity.ok(service.update(newstudent));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletestudent(@PathVariable int id){
        Student student = service.findById(id);
        if (student==null) {
            return new ResponseEntity<Object>("le student avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(service.delete(student));
        }
    }
    @PostMapping("/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("image") MultipartFile file) {
        // Logic to save the image file
        // You can process/save the image here using a service method
        // For example, save it to a directory or store its data in the database

        // You can return a success message or the image URL/location after successful upload
        return ResponseEntity.ok("Image uploaded successfully");
    }

    @GetMapping("/groupe/{id}")
    public List<Student> getStudentsByGroupe(@PathVariable Long id) {
        Groupe groupe = new Groupe();
        groupe.setId(id);
        return service.findStudentsByGroupe(groupe);
    }







}