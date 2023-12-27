package com.dent.dent.services;


import com.dent.dent.IDao.IDao;
import com.dent.dent.entities.PW;
import com.dent.dent.repositories.PwRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class PwService implements IDao<PW> {
    @Autowired
    PwRepository repisitory;


    @Override
    public PW create(PW o) {
        return repisitory.save(o);
    }

    @Override
    public PW update(PW o) {
        return repisitory.save(o);
    }

    @Override
    public Boolean delete(PW o) {
        try {
            repisitory.delete(o);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public PW findById(int id) {
        return repisitory.findById((long) id).orElse(null);
    }

    @Override
    public List<PW> findAll() {
        return repisitory.findAll();
    }
    //////////image upload

    public String uploadDocument(PW pw, MultipartFile file) {
        try {
            String fileName = "document_" + pw.getId() + "_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Files.copy(file.getInputStream(), Paths.get("C:\\Users\\nassi\\Desktop\\chgayer", fileName), StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'upload du document", e);
        }
    }

    ///////dowload
    public ResponseEntity<Resource> downloadDocument(long id) {
        PW pw = findById((int) id);
        if (pw == null || StringUtils.isEmpty(pw.getDocs())) {
            return ResponseEntity.notFound().build();
        }

        try {
            String filename = pw.getDocs(); // Use the stored filename
            Resource resource = new UrlResource("file:C:\\Users\\nassi\\Desktop\\chgayer\\" + filename);

            if (!resource.exists()) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    ///////

}
