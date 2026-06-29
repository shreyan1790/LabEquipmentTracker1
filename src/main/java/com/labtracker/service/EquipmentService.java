package com.labtracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.labtracker.entity.Equipment;
import com.labtracker.repository.EquipmentRepository;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    public Equipment saveEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    public List<Equipment> getAllEquipment() {
        return equipmentRepository.findAll();
    }

    public Equipment getEquipmentById(Long id) {
        return equipmentRepository.findById(id).orElse(null);
    }
    public List<Equipment> searchEquipment(String equipmentName) {
        return equipmentRepository.findByEquipmentNameContainingIgnoreCase(equipmentName);
    }

    public List<Equipment> filterByCategory(String category) {
        return equipmentRepository.findByCategoryIgnoreCase(category);
    }

    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }
    public Equipment updateEquipment(Long id, Equipment updatedEquipment) {

        Equipment equipment = equipmentRepository.findById(id).orElse(null);

        if (equipment != null) {
            equipment.setEquipmentName(updatedEquipment.getEquipmentName());
            equipment.setCategory(updatedEquipment.getCategory());
            equipment.setTotalQuantity(updatedEquipment.getTotalQuantity());
            equipment.setAvailableQuantity(updatedEquipment.getAvailableQuantity());
            equipment.setStatus(updatedEquipment.getStatus());

            return equipmentRepository.save(equipment);
        }

        return null;
    }
}