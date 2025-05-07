import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; 
import { useAuth } from "../context/AuthContext"; 

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔄 Attempting login with credentials:", credentials);
      const response = await loginUser(credentials);

      if (!response || !response.data) {
        throw new Error("Invalid server response");
      }

      console.log("✅ Login response:", response.data);

      if (response.data.status === "success") {
        console.log("🔑 Storing user in context:", credentials.username);
        login({ username: credentials.username }); // ✅ Store user in AuthContext
        navigate("/dashboard"); // ✅ Navigate to dashboard
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("❌ Login failed. Error:", error);
      setError("Invalid username or password.");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
