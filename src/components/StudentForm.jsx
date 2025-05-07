import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadStudentToIPFS } from "../services/api";

const StudentForm = ({ contract }) => {
  const [student, setStudents] = useState({
    id: "",
    firstname: "",
    surname: "",
    age: "",
    department: "",
    contact_no: "",
    date_of_birth: "",
    gender: "",
    father_name: "",
    mother_name: "",
    sem1: "",
    sem2: "",
    sem3: "",
    sem4: "",
    sem5: "",
    sem6: "",
    sem7: "",
    sem8: "",
    student_class: "",
    tot_arr: "",
    year_of_join: "",
  });

  const [ipfsHash, setIpfsHash] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      console.log("Edit Flow Coming Soon");
    }
  }, [id]);

  const handleChange = (e) => {
    setStudents({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract) {
      alert("Blockchain Not Connected!");
      return;
    }

    try {
      if (id) {
        alert("Edit Flow not enabled yet!");
        return;
      }

      const res = await uploadStudentToIPFS(student);
      const hash = res?.data?.ipfsHash;

      if (!hash) throw new Error("IPFS Hash missing in response.");

      console.log("✅ IPFS Hash:", hash);
      setIpfsHash(hash);

      // Save on Blockchain
      await contract.addStudent(
        parseInt(student.id),
        student.firstname,
        parseInt(student.age),
        student.department,
        hash
      );

      alert("🎉 Student Data Added Successfully to Blockchain & IPFS!");
      navigate("/student");

    } catch (error) {
      if (error.code === 4001 || error.message.includes("user rejected")) {
        alert("❌ You rejected the transaction. Please approve it to continue.");
      } else {
        alert("⚠️ Error adding student: " + error.message);
      }
      console.error("❌ Error:", error);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Student" : "Add Student"}</h2>

      <form onSubmit={handleSubmit}>
        <label>ID:</label>
        <input type="number" name="id" value={student.id} onChange={handleChange} required />

        <label>First Name:</label>
        <input type="text" name="firstname" value={student.firstname} onChange={handleChange} required />

        <label>Surname:</label>
        <input type="text" name="surname" value={student.surname} onChange={handleChange} required />

        <label>Age:</label>
        <input type="number" name="age" value={student.age} onChange={handleChange} required />

        <label>Department:</label>
        <input type="text" name="department" value={student.department} onChange={handleChange} required />

        <label>Contact No:</label>
        <input type="text" name="contact_no" value={student.contact_no} onChange={handleChange} required />

        <label>Date of Birth:</label>
        <input type="date" name="date_of_birth" value={student.date_of_birth} onChange={handleChange} required />

        <label>Gender:</label>
        <input type="text" name="gender" value={student.gender} onChange={handleChange} required />

        <label>Father's Name:</label>
        <input type="text" name="father_name" value={student.father_name} onChange={handleChange} required />

        <label>Mother's Name:</label>
        <input type="text" name="mother_name" value={student.mother_name} onChange={handleChange} required />

        {[...Array(8)].map((_, i) => (
          <div key={i}>
            <label>{`Semester ${i + 1} Marks:`}</label>
            <input
              type="number"
              name={`sem${i + 1}`}
              value={student[`sem${i + 1}`]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <label>Class:</label>
        <input type="text" name="student_class" value={student.student_class} onChange={handleChange} required />

        <label>Total Arrears:</label>
        <input type="number" name="tot_arr" value={student.tot_arr} onChange={handleChange} required />

        <label>Year of Joining:</label>
        <input type="number" name="year_of_join" value={student.year_of_join} onChange={handleChange} required />

        <button type="submit">{id ? "Update" : "Add"} Student</button>
      </form>

      {/* 👇 IPFS Success Section */}
      {ipfsHash && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">✅ Uploaded to IPFS!</p>
          <a
            href={`https://ipfs.io/ipfs/${ipfsHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View PDF on IPFS
          </a>

          <div className="mt-2 flex gap-4">
            <a
              href={`https://ipfs.io/ipfs/${ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              📥 Download PDF
            </a>

            <button
              onClick={() =>
                window.open("https://mumbai.polygonscan.com/address/0x5FbDB2315678afecb367f032d93F642f64180aa3", "_blank")
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
            >
              🔗 Verify on Blockchain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForm;
