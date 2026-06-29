package com.labtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labtracker.entity.Student;
import com.labtracker.repository.StudentRepository;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudent(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public List<Student> searchStudent(String name) {
        return studentRepository.findByStudentNameContainingIgnoreCase(name);
    }
    
    
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent != null) {

        	existingStudent.setStudentName(student.getStudentName());
        	existingStudent.setRollNumber(student.getRollNumber());
        	existingStudent.setDepartment(student.getDepartment());
        	existingStudent.setYear(student.getYear());
        	existingStudent.setSection(student.getSection());
        	existingStudent.setEmail(student.getEmail());
        	existingStudent.setPhoneNumber(student.getPhoneNumber());
        	existingStudent.setRfidUid(student.getRfidUid());

            return studentRepository.save(existingStudent);
        }

        return null;
    }
}
