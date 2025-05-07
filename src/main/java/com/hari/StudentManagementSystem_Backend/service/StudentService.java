package com.hari.StudentManagementSystem_Backend.service;

import com.hari.StudentManagementSystem_Backend.model.Student;
import com.hari.StudentManagementSystem_Backend.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // ✅ Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ✅ Get a student by ID
    public Optional<Student> getStudentById(String id) {
        return studentRepository.findById(id);
    }

    // ✅ Add a new student
    public Map<String, String> addStudent(Student student) {
        Optional<Student> existingStudent = studentRepository.findById(student.getId());

        Map<String, String> response = new HashMap<>();

        if (existingStudent.isPresent()) {
            response.put("message", "Student already exists");
            response.put("id", student.getId());
        } else {
            studentRepository.save(student);
            response.put("message", "Student added successfully");
            response.put("id", student.getId());
        }

        return response;
    }

    // ✅ Update an existing student
    public Student updateStudent(String id, Student updatedStudent) {
        return studentRepository.findById(id).map(student -> {
        	student.setFirstname(updatedStudent.getFirstname()); // ✅ Fixed
            student.setSurname(updatedStudent.getSurname());
            student.setAge(updatedStudent.getAge());
            student.setDate_of_birth(updatedStudent.getDate_of_birth()); // ✅ Fixed
            student.setGender(updatedStudent.getGender());
            student.setContact_no(updatedStudent.getContact_no()); // ✅ Fixed
            student.setYear_of_join(updatedStudent.getYear_of_join()); // ✅ Fixed
            student.setDepartment(updatedStudent.getDepartment());
            student.setStudent_class(updatedStudent.getStudent_class()); // ✅ Fixed
            student.setFather_name(updatedStudent.getFather_name()); // ✅ Fixed
            student.setMother_name(updatedStudent.getMother_name()); // ✅ Fixed
            student.setSem1(updatedStudent.getSem1());
            student.setSem2(updatedStudent.getSem2());
            student.setSem3(updatedStudent.getSem3());
            student.setSem4(updatedStudent.getSem4());
            student.setSem5(updatedStudent.getSem5());
            student.setSem6(updatedStudent.getSem6());
            student.setSem7(updatedStudent.getSem7());
            student.setSem8(updatedStudent.getSem8());
            student.setTot_arr(updatedStudent.getTot_arr()); // ✅ Fixed
            student.setPhoto(updatedStudent.getPhoto());
            return studentRepository.save(student);
        }).orElse(null); // Return null if student not found
    }

    // ✅ Delete a student by ID
    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }
}