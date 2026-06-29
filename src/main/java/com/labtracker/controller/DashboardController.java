package com.labtracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.labtracker.repository.EquipmentRepository;
import com.labtracker.repository.StudentRepository;
import com.labtracker.repository.FacultyRepository;
import com.labtracker.repository.TransactionRepository;

@RestController
public class DashboardController {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyRepository facultyRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/api/dashboard")
    public Map<String, Long> getDashboardData() {

        Map<String, Long> dashboard = new HashMap<>();

        dashboard.put("totalEquipment", equipmentRepository.count());
        dashboard.put("totalStudents", studentRepository.count());
        dashboard.put("totalFaculty", facultyRepository.count());
        dashboard.put("totalTransactions", transactionRepository.count());

        return dashboard;
    }
}