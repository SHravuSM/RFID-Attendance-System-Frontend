import { NavLink, Outlet } from "react-router-dom";
import { Server, School, Users, User, Cpu, LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";
import PreventBack from "../../components/PreventBack";

const ADMIN = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <PreventBack />
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">🛠️ Admin</h2>
          <nav className="space-y-2">
            <NavLink
              to="."
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <School size={18} />
              Home
            </NavLink>
            <NavLink
              to="schools"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <School size={18} />
              Schools
            </NavLink>
            <NavLink
              to="students"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <Users size={18} />
              Students
            </NavLink>
            <NavLink
              to="teachers"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <User size={18} />
              Teachers
            </NavLink>
            <NavLink
              to="servicerequest"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <Server size={18} />
              Service Requests
            </NavLink>
            <NavLink
              to="rfiddevices"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <Cpu size={18} />
              RFID Devices
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <LogoutButton />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default ADMIN;
