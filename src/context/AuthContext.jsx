import { createContext, useContext, useState, useEffect } from "react";
import { checkAuthStatus, logoutUser } from "../services/api";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        console.log("🔄 Checking authentication status...");
        const response = await checkAuthStatus();

        if (!response || !response.data) {
          throw new Error("Invalid server response");
        }

        console.log("✅ Auth API Response:", response.data);

        if (response.data.authenticated) {
          setUser(response.data.user); // ✅ Store user object
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("❌ Auth check failed:", error);
        setUser(null);
      }
      setLoading(false);
    };

    verifySession();
  }, []);

  const login = (userData) => {
    console.log("🔑 Storing user in context:", userData);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
