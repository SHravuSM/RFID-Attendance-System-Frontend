import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import APPU from "./pages/APPU";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./components/NotFound";
import Unauthorized from "./components/Unauthorized";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import ADMIN from "./pages/ADMIN/ADMIN";
import AHome from "./pages/ADMIN/Home";
import ASchools from "./pages/ADMIN/Schools";
import AStudents from "./pages/ADMIN/Students";
import ATeachers from "./pages/ADMIN/Teachers";
import AAttendance from "./pages/ADMIN/Attendance";
import ARfidDevices from "./pages/ADMIN/RfidDevices";
import AssignDevice from "./pages/ADMIN/AssignDevice";
import AServiceRequests from "./pages/ADMIN/ServiceRequests";

import INSTITUTION from "./pages/PRINCIPLES/INSTITUTION";
import IHome from "./pages/PRINCIPLES/Home";
import IClasses from "./pages/PRINCIPLES/Classes";
import IDevices from "./pages/PRINCIPLES/Devices";
import IAccount from "./pages/PRINCIPLES/Account";
import IStudents from "./pages/PRINCIPLES/Students";
import ITeachers from "./pages/PRINCIPLES/Teachers";
import IAddStudent from "./pages/PRINCIPLES/AddStudent";
import IAttendance from "./pages/PRINCIPLES/Attendance";
import RFIDDeviceSelector from "./pages/PRINCIPLES/RFIDDeviceSelector";

const App = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (user?.role === "admin") {
        navigate("/ADMIN", { replace: true });
      } else if (user?.role === "institution") {
        navigate("/Institution", { replace: true });
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/APPU" element={<APPU />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/ADMIN"
        element={
          <RoleProtectedRoute allowedRoles={["admin"]}>
            <ADMIN />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<AHome />} />
        <Route path="institutions" element={<ASchools />} />
        <Route path="students" element={<AStudents />} />
        <Route path="teachers" element={<ATeachers />} />
        <Route path="assign-device" element={<AssignDevice />} />
        <Route path="servicerequest" element={<AServiceRequests />} />
        <Route path="attendance" element={<AAttendance />} />
        <Route path="rfiddevices" element={<ARfidDevices />} />
      </Route>

      <Route
        path="/Institution"
        element={
          <RoleProtectedRoute allowedRoles={["institution"]}>
            <INSTITUTION />
          </RoleProtectedRoute>
        }
      >
        <Route index element={<IHome />} />
        <Route path="classes" element={<IClasses />} />
        <Route path="account" element={<IAccount />} />
        <Route path="devices" element={<IDevices />} />
        <Route path="students" element={<IStudents />} />
        <Route path="teachers" element={<ITeachers />} />
        <Route path="attendance" element={<IAttendance />} />
        <Route
          path="rfiddevice/:deviceId/add-student"
          element={<IAddStudent />}
        />
        <Route path="rfiddevice" element={<RFIDDeviceSelector />} />
      </Route>

      {/* Add more routes as needed */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
