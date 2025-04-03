import { Link, NavLink, Outlet } from "react-router-dom";
import { Users, BookOpen, Home, User, LogOut, Server } from "lucide-react";

const SubHome = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">
            📚 Sub-Admin
          </h2>
          <nav className="space-y-2">
            <NavLink
              to="/subhome"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <Home size={18} />
              Home
            </NavLink>
            <NavLink
              to="/subhome/students"
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
              to="/subhome/teachers"
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
              to="/subhome/classes"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <BookOpen size={18} />
              Classes
            </NavLink>
            <NavLink
              to="/subhome/attendance"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <BookOpen size={18} />
              Attendance
            </NavLink>
            <NavLink
              to="/subhome/devices"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                } transition-colors`
              }
            >
              <Server size={18} />
              Devices
            </NavLink>
          </nav>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* <div className="mb-8"> */}

        {/* Nested Content */}
        <Outlet />
        {/* </div> */}
      </main>
    </div>
  );
};

export default SubHome;
