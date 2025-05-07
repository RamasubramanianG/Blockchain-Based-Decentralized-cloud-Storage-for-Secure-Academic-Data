import { useState } from "react";
import { resetPassword } from "../services/api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [user, setUser] = useState({ username: "", newPassword: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(user);
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage("User not found");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="newPassword" placeholder="New Password" onChange={handleChange} required />
        <button type="submit">Reset</button>
      </form>
    </div>
  );
};

export default ResetPassword;
