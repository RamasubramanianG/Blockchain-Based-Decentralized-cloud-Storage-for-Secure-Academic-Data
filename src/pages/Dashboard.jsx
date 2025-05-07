import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user ? user.username : "Guest"}!</h2>
      

      {/* Wrap buttons inside a div with class dashboard-buttons */}
      <div className="dashboard-buttons">
        <button className="view-student" onClick={() => navigate("/student")}>View Students</button>
        <button className="manage-users" onClick={() => navigate("/users")}>Manage Users</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
