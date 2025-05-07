// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract SDMS {

    struct Student {
        string name;
        uint age;
        string course;
        string email;
    }

    mapping(uint => Student) public students;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Not Authorized");
        _;
    }

    // Add Student
    function addStudent(uint _roll, string memory _name, uint _age, string memory _course, string memory _email) public onlyOwner {
        students[_roll] = Student(_name, _age, _course, _email);
    }

    // View Student
    function viewStudent(uint _roll) public view returns (Student memory) {
        return students[_roll];
    }

    // Update Student
    function updateStudent(uint _roll, string memory _name, uint _age, string memory _course, string memory _email) public onlyOwner {
        require(bytes(students[_roll].name).length != 0, "Student doesn't exist");
        students[_roll] = Student(_name, _age, _course, _email);
    }

    // Delete Student
    function deleteStudent(uint _roll) public onlyOwner {
        require(bytes(students[_roll].name).length != 0, "Student doesn't exist");
        delete students[_roll];
    }
}
