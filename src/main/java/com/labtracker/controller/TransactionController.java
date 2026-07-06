package com.labtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.labtracker.entity.Transaction;
import com.labtracker.service.TransactionService;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin("*")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // ==========================
    // Add Transaction
    // ==========================
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {

        System.out.println("Equipment : " + transaction.getEquipmentName());
        System.out.println("Quantity  : " + transaction.getEquipmentQuantity());
        System.out.println("Status    : " + transaction.getStatus());

        return transactionService.saveTransaction(transaction);
    }
    // ==========================
    // Get All Transactions
    // ==========================
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // ==========================
    // Get Transaction By ID
    // ==========================
    @GetMapping("/{id}")
    public Transaction getTransaction(@PathVariable Long id) {
        return transactionService.getTransaction(id);
    }

    // ==========================
    // Update Transaction
    // ==========================
    @PutMapping("/{id}")
    public Transaction updateTransaction(@PathVariable Long id,
                                         @RequestBody Transaction transaction) {
        return transactionService.updateTransaction(id, transaction);
    }

    // ==========================
    // Delete Transaction
    // ==========================
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }

    // ==========================
    // Search by Student
    // ==========================
    @GetMapping("/student/{studentName}")
    public List<Transaction> searchByStudent(@PathVariable String studentName) {
        return transactionService.searchByStudent(studentName);
    }

    // ==========================
    // Search by Faculty
    // ==========================
    @GetMapping("/faculty/{facultyName}")
    public List<Transaction> searchByFaculty(@PathVariable String facultyName) {
        return transactionService.searchByFaculty(facultyName);
    }

    // ==========================
    // Search by Equipment
    // ==========================
    @GetMapping("/equipment/{equipmentName}")
    public List<Transaction> searchByEquipment(@PathVariable String equipmentName) {
        return transactionService.searchByEquipment(equipmentName);
    }

    // ==========================
    // Search by Status
    // ==========================
    @GetMapping("/status/{status}")
    public List<Transaction> searchByStatus(@PathVariable String status) {
        return transactionService.searchByStatus(status);
    }

}