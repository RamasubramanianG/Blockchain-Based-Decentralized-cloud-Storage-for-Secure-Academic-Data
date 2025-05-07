import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/api";
import { useNavigate } from "react-router-dom";

const Student = () => {
  const [students, setStudents] = useState([]); // ✅ fixed
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id); // ✅ fixed
    fetchStudents();
  };

  const handleDownloadPDF = async (ipfsHash) => {
    try {
      const response = await fetch(`http://localhost:5000/api/student/view/${ipfsHash}`);
      if (!response.ok) throw new Error("Failed to download PDF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Student_From_Blockchain.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Download Failed:", error);
      alert("Error while downloading PDF");
    }
  };

  return (
    <div className="student-container">
      <h2>Student List</h2>

      <button className="add-student-btn" onClick={() => navigate("/student/add")}>
        ➕ Add Student
      </button>

      <div className="student-table-container">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>IPFS Hash</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstname} {student.surname}</td>
                <td>{student.department}</td>
                <td style={{ maxWidth: "150px", wordBreak: "break-all" }}>
                  {student.ipfsHash || "N/A"}
                </td>
                <td className="student-actions">
                  <button onClick={() => navigate(`/student/view/${student.id}`)}>👁️ View</button>
                  <button onClick={() => navigate(`/student/edit/${student.id}`)}>✏ Edit</button>
                  <button onClick={() => handleDelete(student.id)}>🗑 Delete</button>
                  {student.ipfsHash && (
                    <button onClick={() => handleDownloadPDF(student.ipfsHash)}>
                      📥 Download PDF
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
