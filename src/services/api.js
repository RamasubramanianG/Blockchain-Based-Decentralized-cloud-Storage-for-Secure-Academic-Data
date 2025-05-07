import axios from "axios";

// ✅ Load from .env (ensure it's defined as VITE_API_URL=http://localhost:8081/api)
const API_BASE_URL = import.meta.env.VITE_API_URL;

// ✅ Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required if using session-based auth
});

export default api;

// ==========================
// 🎓 Student Management APIs
// ==========================
export const getStudents = () => api.get("/student");
export const getStudentById = (id) => api.get(`/student/${id}`);
export const addStudent = (studentData) => api.post("/student", studentData);
export const updateStudent = (id, studentData) => api.put(`/student/${id}`, studentData);
export const deleteStudent = (id) => api.delete(`/student/${id}`);

// ==========================
// 🔐 Authentication APIs
// ==========================
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const resetPassword = (userData) => api.post("/auth/reset-password", userData);
export const checkAuthStatus = () => api.get("/auth/status");
export const logoutUser = () => api.post("/auth/logout");

// ==========================
// 👤 User Management APIs
// ==========================
export const getUsers = () => api.get("/users");
export const getUserById = (id) => api.get(`/users/${id}`);
export const addUser = (userData) => api.post("/users", userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (username) => api.delete(`/users/${username}`);

// ==========================
// 🔐🔗 Blockchain + IPFS + AES
// ==========================

// ✅ Corrected Upload Endpoint (matches backend: /api/student/upload)
export const uploadStudentToIPFS = (studentData) =>
  api.post("/student/upload", studentData);

// ✅ PDF Viewer from IPFS (download endpoint)
export const downloadStudentPDF = (ipfsHash) =>
  `${API_BASE_URL}/student/view/${ipfsHash}`;
