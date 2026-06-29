package com.labtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.labtracker.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByStudentNameContainingIgnoreCase(String studentName);

}