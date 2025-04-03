import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SubHome from "./pages/PRINCIPLES/SubHome";
import Students from "./pages/ADMIN/Students";
import Teachers from "./pages/ADMIN/Teachers";
import Classes from "./pages/PRINCIPLES/Classes";
import Attendance from "./pages/ADMIN/Attendance";
import SubHomeWelcome from "./pages/PRINCIPLES/SubHomeWelcome";
import Devices from "./pages/PRINCIPLES/Devices";
import NotFound from "./components/NotFound";
import Login from "./pages/PRINCIPLES/Login";
import AdminPage from "./pages/ADMIN/AdminPage";
import AdminHomeWelcome from "./pages/ADMIN/AdminHomeWelcome";
import ServiceRequests from "./pages/ADMIN/ServiceRequests";
import RfidDevices from "./pages/ADMIN/RfidDevices";
import Schools from "./pages/ADMIN/Schools";
import AddStudent from "./pages/PRINCIPLES/AddStudent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="/subhome" element={<SubHome />}>
        <Route index element={<SubHomeWelcome />} />
        <Route path="classes" element={<Classes />} />
        <Route path="devices" element={<Devices />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="add-student" element={<AddStudent />} />
      </Route>

      <Route path="/PUNEETHRAJKUMAR17SH" element={<AdminPage />}>
        <Route index element={<AdminHomeWelcome />} />
        <Route path="schools" element={<Schools />} />
        <Route path="students" element={<Students />} />
        <Route path="teachers" element={<Teachers />} />
        <Route path="servicerequest" element={<ServiceRequests />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="rfiddevices" element={<RfidDevices />} />
      </Route>
      {/* Add more routes as needed */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
