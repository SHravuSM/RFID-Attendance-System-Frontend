// // AuthContext.jsx
// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api.js";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const login = async (Id, password) => {
//     try {
//       const res = await api.post(`${import.meta.env.VITE_API_URL}/login`, {
//         Id,
//         password,
//       });

//       const data = res.data; // Axios automatically parses JSON response
//       console.log(data);

//       if (!res.status || res.status !== 200) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);
//       setUser({ Id, role: data.role });

//       return data.role;
//     } catch (error) {
//       console.error("Login error:", error);
//       throw error; // rethrow for higher-level handling
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, login }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    <AuthContext.Provider value={{ user, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
