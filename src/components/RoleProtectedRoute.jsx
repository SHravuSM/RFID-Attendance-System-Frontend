// // src/components/ProtectedRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ allowedRoles, children }) => {
//   const { user } = useAuth();

//   if (!token) return <Navigate to="/login" replace />;
//   if (!allowedRoles.includes(role))
//     return <Navigate to="/unauthorized" replace />;

//   return children;
// };

// export default ProtectedRoute;

// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const RoleProtectedRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user || !allowedRoles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default RoleProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, authReady } = useAuth();

  // ⏳ While checking auth (e.g. after refresh), show loading
  if (!authReady) {
    return <div className="text-center mt-10">Loading...</div>; // You can replace with spinner
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
