package com.labtracker.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import com.labtracker.entity.Transaction;
import com.labtracker.entity.Equipment;
import com.labtracker.repository.EquipmentRepository;
import com.labtracker.repository.TransactionRepository;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;
    // ==========================
    // Save Transaction
    // ==========================
    public Transaction saveTransaction(Transaction transaction) {

        Equipment equipment = equipmentRepository
                .findByEquipmentName(transaction.getEquipmentName());

        if (equipment == null) {
            throw new RuntimeException("Equipment not found.");
        }
        
        if (transaction.getStatus().equalsIgnoreCase("Issued")) {

            if (equipment.getAvailableQuantity() == 0) {
                throw new RuntimeException("No components available.");
            }

            if (transaction.getEquipmentQuantity() > equipment.getAvailableQuantity()) {
                throw new RuntimeException(
                        "Only " + equipment.getAvailableQuantity() + " components are available."
                );
            }
            equipment.setAvailableQuantity(
                    equipment.getAvailableQuantity() - transaction.getEquipmentQuantity()
            );

            equipmentRepository.save(equipment);

        }

        return transactionRepository.save(transaction);
    }

    // ==========================
    // Get All Transactions
    // ==========================
    public List<Transaction> getAllTransactions() {

        updateOverdueTransactions();

        return transactionRepository.findAll();
    }
    
    public void updateOverdueTransactions() {

        List<Transaction> transactions = transactionRepository.findAll();

        LocalDateTime now = LocalDateTime.now();

        for (Transaction transaction : transactions) {

            if (transaction.getStatus().equalsIgnoreCase("Issued")) {

                if (transaction.getExpectedReturnDate() != null
                        && transaction.getExpectedReturnTime() != null
                        && !transaction.getExpectedReturnTime().isBlank()) {

                    LocalDateTime expectedDateTime = LocalDateTime.of(
                            transaction.getExpectedReturnDate(),
                            LocalTime.parse(transaction.getExpectedReturnTime())
                    );

                    if (now.isAfter(expectedDateTime)) {

                        transaction.setStatus("Overdue");

                        transactionRepository.save(transaction);
                    }
                }
            }
        }
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
        	
        	Equipment equipment = equipmentRepository
        	        .findByEquipmentName(transaction.getEquipmentName());
        

        	if (equipment == null) {
        	    throw new RuntimeException("Equipment not found.");
        	}

        	
        	String oldStatus = transaction.getStatus();
        	String newStatus = transactionDetails.getStatus();

        	int quantity = transaction.getEquipmentQuantity();
        	
        	// Issued -> Returned
        	if (oldStatus.equalsIgnoreCase("Issued")
        	        && newStatus.equalsIgnoreCase("Returned")) {

        		System.out.println("Old Status: " + oldStatus);
        		System.out.println("New Status: " + newStatus);
        		System.out.println("Available Before: " + equipment.getAvailableQuantity());

        		equipment.setAvailableQuantity(
        		        equipment.getAvailableQuantity() + quantity
        		);

        		System.out.println("Available After: " + equipment.getAvailableQuantity());

        		equipmentRepository.save(equipment);
        	}
        	
        	
            transaction.setStudentName(transactionDetails.getStudentName());
            transaction.setFacultyName(transactionDetails.getFacultyName());
            transaction.setEquipmentName(transactionDetails.getEquipmentName());

            transaction.setEquipmentQuantity(transactionDetails.getEquipmentQuantity());

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