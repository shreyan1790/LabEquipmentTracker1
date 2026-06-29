package com.labtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labtracker.entity.Transaction;
import com.labtracker.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // ==========================
    // Save Transaction
    // ==========================
    public Transaction saveTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    // ==========================
    // Get All Transactions
    // ==========================
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // ==========================
    // Get Transaction By ID
    // ==========================
    public Transaction getTransaction(Long id) {
        return transactionRepository.findById(id).orElse(null);
    }

    // ==========================
    // Update Transaction
    // ==========================
    public Transaction updateTransaction(Long id, Transaction transactionDetails) {

        Transaction transaction = transactionRepository.findById(id).orElse(null);

        if (transaction != null) {

            transaction.setStudentName(transactionDetails.getStudentName());
            transaction.setFacultyName(transactionDetails.getFacultyName());
            transaction.setEquipmentName(transactionDetails.getEquipmentName());

            transaction.setIssueDate(transactionDetails.getIssueDate());
            transaction.setIssueTime(transactionDetails.getIssueTime());

            transaction.setExpectedReturnDate(transactionDetails.getExpectedReturnDate());
            transaction.setExpectedReturnTime(transactionDetails.getExpectedReturnTime());

            transaction.setActualReturnDate(transactionDetails.getActualReturnDate());
            transaction.setActualReturnTime(transactionDetails.getActualReturnTime());

            transaction.setStatus(transactionDetails.getStatus());
            transaction.setRemarks(transactionDetails.getRemarks());

            return transactionRepository.save(transaction);
        }

        return null;
    }

    // ==========================
    // Delete Transaction
    // ==========================
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    // ==========================
    // Search by Student
    // ==========================
    public List<Transaction> searchByStudent(String studentName) {
        return transactionRepository.findByStudentNameContainingIgnoreCase(studentName);
    }

    // ==========================
    // Search by Faculty
    // ==========================
    public List<Transaction> searchByFaculty(String facultyName) {
        return transactionRepository.findByFacultyNameContainingIgnoreCase(facultyName);
    }

    // ==========================
    // Search by Equipment
    // ==========================
    public List<Transaction> searchByEquipment(String equipmentName) {
        return transactionRepository.findByEquipmentNameContainingIgnoreCase(equipmentName);
    }

    // ==========================
    // Search by Status
    // ==========================
    public List<Transaction> searchByStatus(String status) {
        return transactionRepository.findByStatus(status);
    }

}