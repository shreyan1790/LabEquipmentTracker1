package com.labtracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.labtracker.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {

}