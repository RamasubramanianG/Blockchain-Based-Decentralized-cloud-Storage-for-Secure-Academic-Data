package com.hari.StudentManagementSystem_Backend.Repository;
import com.hari.StudentManagementSystem_Backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
}
