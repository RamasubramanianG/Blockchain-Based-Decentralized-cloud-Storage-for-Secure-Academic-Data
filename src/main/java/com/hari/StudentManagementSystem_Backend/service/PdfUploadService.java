package com.hari.StudentManagementSystem_Backend.service;

import com.hari.StudentManagementSystem_Backend.model.Student;
import org.springframework.stereotype.Service;

@Service
public class PdfUploadService {

    public String uploadPdfAndReturnHash(Student student) {
        // 🛠️ TODO: Generate PDF, encrypt, upload to IPFS (dummy for now)
        System.out.println("📄 Generating and uploading PDF for " + student.getFirstname());

        // 🔁 Return dummy hash for now
        return "QmDummyIPFSHashFor_" + student.getFirstname();
    }
}
