package com.labtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.labtracker.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    // Search by Student Name
    List<Transaction> findByStudentNameContainingIgnoreCase(String studentName);

    // Search by Faculty Name
    List<Transaction> findByFacultyNameContainingIgnoreCase(String facultyName);

    // Search by Equipment Name
    List<Transaction> findByEquipmentNameContainingIgnoreCase(String equipmentName);

    // Search by Status
    List<Transaction> findByStatus(String status);

}