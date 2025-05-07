package com.hari.StudentManagementSystem_Backend.controller;

import com.hari.StudentManagementSystem_Backend.model.Student;
import com.hari.StudentManagementSystem_Backend.service.StudentService;
import com.hari.StudentManagementSystem_Backend.service.PdfUploadService;
 // ✅ Your real service

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.util.*;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    @Autowired
    private StudentService studentService;
    @Autowired
    private PdfUploadService pdfUploadService;
    // ✅ injected service

    // ✅ Get All Students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    // ✅ Get a Student by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable String id) {
        Optional<Student> student = studentService.getStudentById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Student not found with ID " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }
    }
    // ✅ Add a New Student
    @PostMapping
    public ResponseEntity<Map<String, String>> addStudent(@RequestBody Student student) {
        Map<String, String> response = studentService.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ✅ Update Student
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable String id, @RequestBody Student studentDetails) {
        Student updated = studentService.updateStudent(id, studentDetails);
        if (updated != null) {
            return ResponseEntity.ok(Map.of("message", "Student updated successfully", "id", id));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Student not found with ID " + id));
        }
    }



    // ✅ Upload PDF → Encrypt → IPFS
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadStudentData(@RequestBody Student student) {
        System.out.println("🔥 Uploading student: " + student.getFirstname());

        String ipfsHash = pdfUploadService.uploadPdfAndReturnHash(student); // your logic here

        Map<String, String> response = new HashMap<>();
        response.put("message", "Upload successful");
        response.put("ipfsHash", ipfsHash);

        return ResponseEntity.ok(response);
    }

    // ✅ Delete a Student
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable String id) {
        Optional<Student> student = studentService.getStudentById(id);
        if (student.isPresent()) {
            studentService.deleteStudent(id);
            return ResponseEntity.ok(Map.of("message", "Student deleted successfully", "id", id));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Student not found with ID " + id));
        }
    }
}
