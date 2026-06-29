package com.labtracker.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.labtracker.entity.Equipment;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

    List<Equipment> findByEquipmentNameContainingIgnoreCase(String equipmentName);

    List<Equipment> findByCategoryIgnoreCase(String category);

}