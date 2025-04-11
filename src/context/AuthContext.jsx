import { createContext, useContext, useEffect, useState } from "react";
import api from "../api.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState({});
  const [authReady, setAuthReady] = useState(false); // 🚀 NEW

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }

    setAuthReady(true); // ✅ Tell the app that auth check is done
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/institution/institutions/home");
      // console.log(res.data)
      // {
      //   totalStudents,
      //   totalTeachers,
      //   totalClasses,
      //   attendancePercentage,
      // } = res.data
      // console.log(typeof res.data, res.data);
      setData(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const login = async (Id, password) => {
    try {
      const res = await api.post(`${import.meta.env.VITE_API_URL}/login`, {
        Id,
        password,
      });

      const data = res.data;
      if (!res.status || res.status !== 200) {
        throw new Error(data.message || "Login failed");
      }
      const decoded = jwtDecode(data.token);
      const role = decoded.role;

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", role);

      // Update context state
      setUser({
        Id: decoded.username || decoded.institutionCode || decoded.name,
        role,
      });

      return role;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, data, logout, authReady, fetchClasses }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
