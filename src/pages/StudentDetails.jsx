import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const response = await getStudentById(id);
      setStudent(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleDownloadPDF = async () => {
    const fileName = prompt("Enter file name for the PDF:", `Student_${id}.pdf`);
// sourcery skip: use-braces
    if (!fileName) return;

    const input = pdfRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save(fileName);
  };

  const handleDownloadFromBlockchain = async (ipfsHash) => {
    try {
      const response = await fetch(`http://localhost:5000/api/student/view/${ipfsHash}`);
      if (!response.ok) throw new Error("Failed to download PDF from Blockchain");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'Student_From_Blockchain.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error downloading from Blockchain:", error);
      alert("Failed to download from Blockchain IPFS");
    }
  };

  return (
    <div className="student-detail-container">
      <h2>Student Details</h2>
      {student ? (
        <div ref={pdfRef} className="student-info">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.firstname} {student.surname}</p>
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
          <p><strong>Department:</strong> {student.department}</p>
          <p><strong>Year of Join:</strong> {student.year_of_join}</p>
          <p><strong>Contact No:</strong> {student.contact_no}</p>
          <p><strong>Father's Name:</strong> {student.father_name}</p>
          <p><strong>Mother's Name:</strong> {student.mother_name}</p>
          <p><strong>Total Arrears:</strong> {student.tot_arr}</p>

          <p><strong>Semesters:</strong></p>
          <ul>
            {[...Array(8)].map((_, i) => (
              <li key={i}>Sem {i + 1}: {student[`sem${i + 1}`]}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}

      <div className="student-actions">
        <button onClick={handleDownloadPDF}>📄 Download Local PDF</button>

        {student?.ipfsHash && (
          <button onClick={() => handleDownloadFromBlockchain(student.ipfsHash)}>
            ⬇ Download From Blockchain
          </button>
        )}

        <button onClick={() => window.print()}>🖨 Print</button>
      </div>
    </div>
  );
};

export default StudentDetail;
