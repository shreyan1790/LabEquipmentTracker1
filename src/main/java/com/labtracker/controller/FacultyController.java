package com.labtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.labtracker.entity.Faculty;
import com.labtracker.service.FacultyService;

@RestController
@RequestMapping("/api/faculty")
@CrossOrigin("*")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @PostMapping
    public Faculty addFaculty(@RequestBody Faculty faculty) {
        return facultyService.saveFaculty(faculty);
    }

    @GetMapping
    public List<Faculty> getAllFaculty() {
        return facultyService.getAllFaculty();
    }

    @GetMapping("/{id}")
    public Faculty getFaculty(@PathVariable Long id) {
        return facultyService.getFaculty(id);
    }

    @DeleteMapping("/{id}")
    public void deleteFaculty(@PathVariable Long id) {
        facultyService.deleteFaculty(id);
    }
    
    @PutMapping("/{id}")
    public Faculty updateFaculty(@PathVariable Long id,
                                 @RequestBody Faculty faculty) {
        return facultyService.updateFaculty(id, faculty);
    }

    @GetMapping("/search/{name}")
    public List<Faculty> searchFaculty(@PathVariable String name) {
        return facultyService.searchFaculty(name);
    }
}