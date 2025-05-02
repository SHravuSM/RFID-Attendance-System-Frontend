import { NavLink, Outlet } from "react-router-dom";
import {
  Server,
  School,
  Users,
  User,
  Cpu,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import PreventBack from "../../components/PreventBack";
import LogoutButton from "./LogoutButton";

const ADMIN = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 relative">
      <PreventBack />

      {/* Mobile Topbar */}
      <div className="fixed top-0 left-0 right-0 bg-white/60 backdrop-blur-lg border-b border-purple-200 shadow-lg px-4 py-3 z-50 md:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl shadow-md bg-white/70 backdrop-blur-md hover:shadow-xl hover:bg-white/90 transition-all duration-200"
          >
            <Menu size={24} className="text-blue-600" />
          </button>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            RFID Attendance System
          </h2>
          <div></div>
        </div>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed md:static top-0 left-0 z-50 h-screen w-64 bg-white/40 backdrop-blur-lg shadow-2xl border-r border-white/30 rounded-tr-3xl rounded-br-3xl flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-6 flex justify-between items-center md:block">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
          <h2 className="hidden md:block text-2xl text-center font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            RFID Attendance System
          </h2>
        </div>

        <nav className="space-y-2 px-6 flex-1 overflow-y-auto">
          {[
            { to: ".", label: "Home", icon: <School size={18} /> },
            {
              to: "institutions",
              label: "Institutions",
              icon: <School size={18} />,
            },
            { to: "students", label: "Students", icon: <Users size={18} /> },
            { to: "teachers", label: "Teachers", icon: <User size={18} /> },
            {
              to: "servicerequest",
              label: "Service Requests",
              icon: <Server size={18} />,
            },
            {
              to: "rfiddevices",
              label: "RFID Devices",
              icon: <Cpu size={18} />,
            },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-gradient-to-r from-blue-100 to-purple-200 text-blue-800 shadow-md"
                  : "text-gray-700 hover:bg-white/50 hover:text-blue-600"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/30">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-full overflow-y-auto">
        <main className="min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10 transition-all duration-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ADMIN;
