package com.labtracker.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/student")
    public String student() {
        return "student";
    }

    @GetMapping("/faculty")
    public String faculty() {
        return "faculty";
    }
    
    @GetMapping("/equipment")
    public String equipment() {
        return "equipment";
    }

    @GetMapping("/transaction")
    public String transaction() {
        return "transaction";
    }

}