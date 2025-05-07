import { useEffect, useState } from "react";
import { getUsers, deleteUser, resetPassword } from "../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  // ✅ Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
    }
  };

  // ✅ Delete User
  const handleDelete = async (username) => {
    try {
      await deleteUser(username);
      fetchUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error("❌ Error deleting user:", error);
    }
  };

  // ✅ Reset Password (Hardcoded new password for now)
  const handleResetPassword = async (username) => {
    const newPassword = prompt(`Enter new password for ${username}:`);
    if (!newPassword) return;

    try {
      await resetPassword({ username, newPassword });
      alert(`Password reset successfully for ${username}`);
    } catch (error) {
      console.error("❌ Error resetting password:", error);
    }
  };

  return (
    <div className="users-container">
      <h2>User Management</h2>

      {/* ✅ Users Table */}
      <table border="1">
        <thead>
          <tr>
            <th>SNo</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td> {/* ✅ Auto-incremented SNo */}
              <td>{user.username}</td>
              <td>
              <td>
    <button className="reset-btn" onClick={() => handleResetPassword(user.username)}>🔑 Reset Password</button>
    <button className="delete-btn" onClick={() => handleDelete(user.username)}>🗑 Delete</button>
</td>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
