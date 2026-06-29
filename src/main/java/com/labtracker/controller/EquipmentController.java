package com.labtracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.labtracker.entity.Equipment;
import com.labtracker.service.EquipmentService;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin("*")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @PostMapping
    public Equipment addEquipment(@RequestBody Equipment equipment) {
        return equipmentService.saveEquipment(equipment);
    }

    @GetMapping
    public List<Equipment> getAllEquipment() {
        return equipmentService.getAllEquipment();
    }

    @GetMapping("/{id}")
    public Equipment getEquipmentById(@PathVariable Long id) {
        return equipmentService.getEquipmentById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return "Equipment Deleted Successfully";
    }
    @PutMapping("/{id}")
    public Equipment updateEquipment(
            @PathVariable Long id,
            @RequestBody Equipment equipment) {

        return equipmentService.updateEquipment(id, equipment);
    }
    @GetMapping("/search/{name}")
    public List<Equipment> searchEquipment(
            @PathVariable String name) {

        return equipmentService.searchEquipment(name);
    }
    @GetMapping("/category/{category}")
    public List<Equipment> filterByCategory(
            @PathVariable String category) {

        return equipmentService.filterByCategory(category);
    }
}