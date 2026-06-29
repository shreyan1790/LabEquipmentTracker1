package com.labtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labtracker.entity.Faculty;
import com.labtracker.repository.FacultyRepository;

@Service
public class FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    public Faculty saveFaculty(Faculty faculty) {
        return facultyRepository.save(faculty);
    }

    public List<Faculty> getAllFaculty() {
        return facultyRepository.findAll();
    }

    public Faculty getFaculty(Long id) {
        return facultyRepository.findById(id).orElse(null);
    }

    public void deleteFaculty(Long id) {
        facultyRepository.deleteById(id);
    }

    public List<Faculty> searchFaculty(String name) {
        return facultyRepository.findByFacultyNameContainingIgnoreCase(name);
    }
    
    public Faculty updateFaculty(Long id, Faculty facultyDetails) {

        Faculty faculty = facultyRepository.findById(id).orElse(null);

        if (faculty != null) {
            faculty.setFacultyName(facultyDetails.getFacultyName());
            faculty.setDepartment(facultyDetails.getDepartment());
            faculty.setDesignation(facultyDetails.getDesignation());
            faculty.setEmail(facultyDetails.getEmail());

            faculty.setEmployeeId(facultyDetails.getEmployeeId());
            faculty.setPhoneNumber(facultyDetails.getPhoneNumber());
            
            return facultyRepository.save(faculty);
        }

        return null;
    }
}