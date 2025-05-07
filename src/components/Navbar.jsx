import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth(); // ✅ Use `user` instead of `isAuthenticated`

  return (
    <nav className="navbar">
      <h2>Student Management System</h2>
      <ul>
        {user ? ( // ✅ Check if user is logged in
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/student">Students</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
