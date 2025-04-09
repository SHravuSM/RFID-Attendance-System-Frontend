import { NavLink, Outlet } from "react-router-dom";
import { Server, School, Users, User, Cpu, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import PreventBack from "../../components/PreventBack";
import LogoutButton from "./LogoutButton";

const ADMIN = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 overflow-x-hidden relative">
      <PreventBack />

      {/* Mobile Topbar */}
      <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-4 py-3 z-50 md:hidden">
        <div className="relative flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-blue-100 hover:bg-blue-200 transition p-2 rounded-md"
          >
            <Menu size={24} className="text-blue-600" />
          </button>

          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">
            Admin Panel
          </h2>
        </div>
      </div>

      {/* Backdrop for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md shadow-md z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static top-0 left-0 z-50 h-full w-64 bg-white md:rounded-none rounded-tr-2xl rounded-br-2xl shadow-xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-6 flex justify-between items-center md:block">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <h2 className="hidden md:block text-2xl font-bold text-gray-800 mb-10">🛠️ Admin</h2>
        </div>

        <nav className="space-y-2 px-6">
          {[
            { to: ".", label: "Home", icon: <School size={18} /> },
            { to: "institutions", label: "institutions", icon: <School size={18} /> },
            { to: "students", label: "Students", icon: <Users size={18} /> },
            { to: "teachers", label: "Teachers", icon: <User size={18} /> },
            { to: "servicerequest", label: "Service Requests", icon: <Server size={18} /> },
            { to: "rfiddevices", label: "RFID Devices", icon: <Cpu size={18} /> },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-gray-200">
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10 transition-all duration-200">
        <Outlet />
      </main>
    </div>
  );
};

export default ADMIN;