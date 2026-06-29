package com.labtracker.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.labtracker.entity.Faculty;

public interface FacultyRepository extends JpaRepository<Faculty, Long> 
{
    List<Faculty> findByFacultyNameContainingIgnoreCase(String facultyName);

}