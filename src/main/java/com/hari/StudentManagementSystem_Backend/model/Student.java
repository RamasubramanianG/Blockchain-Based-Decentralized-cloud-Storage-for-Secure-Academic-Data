package com.hari.StudentManagementSystem_Backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "studentdatamgmt")
public class Student {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "firstname")
    private String firstname;  // ✅ Field name matches DB column

    @Column(name = "surname")
    private String surname;

    @Column(name = "age")
    private Integer age;

    @Column(name = "date_of_birth")
    private String date_of_birth;  // ✅ Field name matches DB column

    @Column(name = "gender")
    private String gender;

    @Column(name = "contact_no")
    private String contact_no;

    @Column(name = "year_of_join")
    private Integer year_of_join;

    @Column(name = "department")
    private String department;

    @Column(name = "student_class")
    private String student_class;

    @Column(name = "father_name")
    private String father_name;

    @Column(name = "mother_name")
    private String mother_name;

    @Column(name = "sem1")
    private Double sem1;

    @Column(name = "sem2")
    private Double sem2;

    @Column(name = "sem3")
    private Double sem3;

    @Column(name = "sem4")
    private Double sem4;

    @Column(name = "sem5")
    private Double sem5;

    @Column(name = "sem6")
    private Double sem6;

    @Column(name = "sem7")
    private Double sem7;

    @Column(name = "sem8")
    private Double sem8;

    @Column(name = "tot_arr")
    private Integer tot_arr;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    // ✅ Getters and Setters (Ensure Correct Naming)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFirstname() { return firstname; }  // ✅ Correct getter
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getSurname() { return surname; }
    public void setSurname(String surname) { this.surname = surname; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getDate_of_birth() { return date_of_birth; }  // ✅ Correct getter
    public void setDate_of_birth(String date_of_birth) { this.date_of_birth = date_of_birth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getContact_no() { return contact_no; }  // ✅ Correct getter
    public void setContact_no(String contact_no) { this.contact_no = contact_no; }

    public Integer getYear_of_join() { return year_of_join; }  // ✅ Correct getter
    public void setYear_of_join(Integer year_of_join) { this.year_of_join = year_of_join; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getStudent_class() { return student_class; }  // ✅ Correct getter
    public void setStudent_class(String student_class) { this.student_class = student_class; }

    public String getFather_name() { return father_name; }  // ✅ Correct getter
    public void setFather_name(String father_name) { this.father_name = father_name; }

    public String getMother_name() { return mother_name; }  // ✅ Correct getter
    public void setMother_name(String mother_name) { this.mother_name = mother_name; }

    public Double getSem1() { return sem1; }
    public void setSem1(Double sem1) { this.sem1 = sem1; }

    public Double getSem2() { return sem2; }
    public void setSem2(Double sem2) { this.sem2 = sem2; }

    public Double getSem3() { return sem3; }
    public void setSem3(Double sem3) { this.sem3 = sem3; }

    public Double getSem4() { return sem4; }
    public void setSem4(Double sem4) { this.sem4 = sem4; }

    public Double getSem5() { return sem5; }
    public void setSem5(Double sem5) { this.sem5 = sem5; }

    public Double getSem6() { return sem6; }
    public void setSem6(Double sem6) { this.sem6 = sem6; }

    public Double getSem7() { return sem7; }
    public void setSem7(Double sem7) { this.sem7 = sem7; }

    public Double getSem8() { return sem8; }
    public void setSem8(Double sem8) { this.sem8 = sem8; }

    public Integer getTot_arr() { return tot_arr; }  // ✅ Correct getter
    public void setTot_arr(Integer tot_arr) { this.tot_arr = tot_arr; }

    public byte[] getPhoto() { return photo; }
    public void setPhoto(byte[] photo) { this.photo = photo; }
}
