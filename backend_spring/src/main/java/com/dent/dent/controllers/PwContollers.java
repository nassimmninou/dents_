package com.dent.dent.controllers;

import com.dent.dent.entities.PW;
import com.dent.dent.services.PwService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.core.io.Resource;
import java.util.List;

@RestController
@RequestMapping("/api/v1/pws")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})

public class PwContollers {
    @Autowired
    private PwService service;

    @GetMapping
    public List<PW> findAllPWs(){
        return service.findAll();
    }
    @PostMapping
    public PW createPW(@RequestBody PW PW){
        try {
            // Log the incoming payload for troubleshooting
            System.out.println("Incoming PW data: " + PW.toString());
            // Your existing logic to create and return a PW
            return service.create(PW);
        } catch (Exception e) {
            e.printStackTrace();
            // You might want to log the exception details as well
            return null; // or handle the exception appropriately
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable int id) {
        PW PW = service.findById(id);
        if (PW==null) {
            return new ResponseEntity<Object>("la PW avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(PW);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Object> updatePW(@PathVariable int id, @RequestBody PW newPW){
        PW PW = service.findById(id);
        if (PW==null) {
            return new ResponseEntity<Object>("le PW avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            newPW.setId((long) id);
            return ResponseEntity.ok(service.update(newPW));
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletePW(@PathVariable int id){
        PW pw = service.findById(id);
        if (pw==null) {
            return new ResponseEntity<Object>("le PW avec id : "+id+"est introuvable", HttpStatus.BAD_REQUEST);
        }else {
            return ResponseEntity.ok(service.delete(pw));
        }
    }
///////////upload image


    @PostMapping("/{id}/upload")
    public ResponseEntity<Object> uploadDocument(@PathVariable long id, @RequestParam("file") MultipartFile file) {
        PW pw = service.findById((int) id);
        if (pw == null) {
            return new ResponseEntity<>("Le PW avec l'ID : " + id + " est introuvable", HttpStatus.BAD_REQUEST);
        } else {
            String documentPath = service.uploadDocument(pw, file);
            pw.setDocs(documentPath);
            service.update(pw);
            return ResponseEntity.ok("Document uploadé avec succès");
        }
    }
    ////////////////////////////////dowload
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadDocument(@PathVariable long id) {
        return service.downloadDocument(id);
    }


}