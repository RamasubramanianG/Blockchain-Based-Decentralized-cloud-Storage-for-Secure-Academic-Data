import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Users from "./pages/Users";
import StudentForm from "./components/StudentForm";
import StudentDetail from "./pages/StudentDetails";
import ProtectedRoute from "./components/ProtectedRoute";

// Blockchain Imports
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractAddress, contractABI } from "./utils/contract";

// Styles
import "./styles/global.css";
import "./styles/Navbar.css";
import "./styles/Login.css";
import "./styles/Register.css";
import "./styles/Dashboard.css";
import "./styles/Student.css";
import "./styles/Users.css";
import "./styles/StudentForm.css";
import "./styles/StudentDetails.css";

if (window.ethereum && !window.ethereum._isConnecting) {
  window.ethereum._isConnecting = true;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  window.ethereum._isConnecting = false;
}


console.log("✅ App Component Loaded...");

function App() {
  console.log("✅ Rendering App...");

  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadBlockchain = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const sdmsContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(sdmsContract);
        console.log("✅ Smart Contract Connected: ", sdmsContract);
      } else {
        alert("MetaMask not detected!");
      }
    };

    loadBlockchain();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard contract={contract} /></ProtectedRoute>} />
          <Route path="/student" element={<ProtectedRoute><Student contract={contract} /></ProtectedRoute>} />
          <Route path="/student/view/:id" element={<ProtectedRoute><StudentDetail contract={contract} /></ProtectedRoute>} />
          <Route path="/student/add" element={<ProtectedRoute><StudentForm contract={contract} /></ProtectedRoute>} />
          <Route path="/student/edit/:id" element={<ProtectedRoute><StudentForm contract={contract} /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
