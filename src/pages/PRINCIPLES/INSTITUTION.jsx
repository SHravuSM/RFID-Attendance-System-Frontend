// import { NavLink, Outlet } from "react-router-dom";
// import { Users, BookOpen, Home, User, LogOut, Server } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";

// const INSTITUTION = () => {
//   // inside your SubHome component
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <PreventBack />
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
//         <div className="p-6">
//           <h2 className="text-2xl font-bold text-gray-800 mb-10">
//             📚 Sub-Admin
//           </h2>
//           <nav className="space-y-2">
//             <NavLink
//               to="."
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//             >
//               <Home size={18} />
//               Home
//             </NavLink>
//             <NavLink
//               to="students"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//             >
//               <Users size={18} />
//               Students
//             </NavLink>
//             <NavLink
//               to="teachers"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//             >
//               <User size={18} />
//               Teachers
//             </NavLink>
//             <NavLink
//               to="classes"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//             >
//               <BookOpen size={18} />
//               Classes
//             </NavLink>
//             <NavLink
//               to="attendance"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//             >
//               <BookOpen size={18} />
//               Attendance
//             </NavLink>
//             <NavLink
//               to="devices"
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//             >
//               <Server size={18} />
//               Devices
//             </NavLink>
//           </nav>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-gray-200">
//           <button
//             onClick={() => {
//               logout();
//               navigate("/login");
//             }}
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-10">
//         {/* <div className="mb-8"> */}

//         {/* Nested Content */}
//         <Outlet />
//         {/* </div> */}
//       </main>
//     </div>
//   );
// };

// export default INSTITUTION;

// import { NavLink, Outlet } from "react-router-dom";
// import {
//   Users,
//   BookOpen,
//   Home,
//   User,
//   LogOut,
//   Server,
//   Menu,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";
// import { useState } from "react";

// const INSTITUTION = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100 relative">
//       <PreventBack />

//       {/* Hamburger Menu - Small Screens */}
//       <button
//         onClick={() => setIsSidebarOpen(true)}
//         className="absolute top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-full"
//         } fixed z-50 md:static md:translate-x-0 top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out`}
//       >
//         <div className="p-6 flex justify-between items-center md:block">
//           <h2 className="text-2xl font-bold text-gray-800 mb-10 md:mb-10">
//             📚 Sub-Admin
//           </h2>
//           {/* Close Button - Mobile Only */}
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="md:hidden"
//           >
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="space-y-2 px-6">
//           {[
//             { to: ".", label: "Home", icon: <Home size={18} /> },
//             { to: "students", label: "Students", icon: <Users size={18} /> },
//             { to: "teachers", label: "Teachers", icon: <User size={18} /> },
//             { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
//             {
//               to: "attendance",
//               label: "Attendance",
//               icon: <BookOpen size={18} />,
//             },
//             { to: "devices", label: "Devices", icon: <Server size={18} /> },
//           ].map(({ to, label, icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//               onClick={() => setIsSidebarOpen(false)} // auto-close on mobile
//             >
//               {icon}
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="p-6 mt-auto border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-10 md:ml-0">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default INSTITUTION;

// import { NavLink, Outlet } from "react-router-dom";
// import {
//   Users,
//   BookOpen,
//   Home,
//   User,
//   LogOut,
//   Server,
//   Menu,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";
// import { useState, useEffect } from "react";

// const INSTITUTION = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex min-h-screen bg-gray-100 overflow-x-hidden relative">
//       <PreventBack />

//       {/* Hamburger Menu - Small Screens */}
//       <button
//         onClick={() => setIsSidebarOpen(true)}
//         className="absolute top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed md:static top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
//       >
//         <div className="p-6 flex justify-between items-center md:block">
//           <h2 className="text-2xl font-bold text-gray-800 mb-10 md:mb-10">
//             📚 Sub-Admin
//           </h2>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="space-y-2 px-6">
//           {[
//             { to: ".", label: "Home", icon: <Home size={18} /> },
//             { to: "students", label: "Students", icon: <Users size={18} /> },
//             { to: "teachers", label: "Teachers", icon: <User size={18} /> },
//             { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
//             {
//               to: "attendance",
//               label: "Attendance",
//               icon: <BookOpen size={18} />,
//             },
//             { to: "devices", label: "Devices", icon: <Server size={18} /> },
//           ].map(({ to, label, icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               {icon}
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-6 mt-auto border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default INSTITUTION;

// import { NavLink, Outlet } from "react-router-dom";
// import {
//   Users,
//   BookOpen,
//   Home,
//   User,
//   LogOut,
//   Server,
//   Menu,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";
// import { useState, useEffect } from "react";

// const INSTITUTION = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex min-h-screen bg-gray-100 overflow-x-hidden relative">
//       <PreventBack />

//       {/* Hamburger Menu - Small Screens */}
//       <button
//         onClick={() => setIsSidebarOpen(true)}
//         className="absolute top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
//       >
//         <Menu size={24} />
//       </button>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed md:static top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
//       >
//         <div className="p-6 flex justify-between items-center md:block">
//           <h2 className="text-2xl font-bold text-gray-800 mb-10 md:mb-10">
//             📚 Sub-Admin
//           </h2>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="space-y-2 px-6">
//           {[
//             { to: ".", label: "Home", icon: <Home size={18} /> },
//             { to: "students", label: "Students", icon: <Users size={18} /> },
//             { to: "teachers", label: "Teachers", icon: <User size={18} /> },
//             { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
//             {
//               to: "attendance",
//               label: "Attendance",
//               icon: <BookOpen size={18} />,
//             },
//             { to: "devices", label: "Devices", icon: <Server size={18} /> },
//           ].map(({ to, label, icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               {icon}
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-6 mt-auto border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 overflow-x-hidden">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default INSTITUTION;

// import { NavLink, Outlet } from "react-router-dom";
// import {
//   Users,
//   BookOpen,
//   Home,
//   User,
//   LogOut,
//   Server,
//   Menu,
//   X,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";
// import { useState, useEffect } from "react";

// const INSTITUTION = () => {
//   const navigate = useNavigate();
//   const { logout } = useAuth();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Prevent body scroll when sidebar is open on mobile
//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex min-h-screen bg-gray-100 overflow-x-hidden relative">
//       <PreventBack />

//       {/* Hamburger Menu - Small Screens */}
//       <div className="fixed items-center flex top-4 w-dvw left-4 z-50 md:hidden">
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="bg-white p-2 rounded-md shadow-md"
//         >
//           <Menu size={24} />
//         </button>
//         <h2 className="pl-32">CtrlCurv</h2>
//       </div>

//       {/* Overlay for mobile */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed md:static top-0 left-0 z-50 h-full w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
//       >
//         <div className="p-6 flex justify-between items-center md:block">
//           <h2 className="text-2xl font-bold text-gray-800 mb-10 md:mb-10">
//             📚 CtrlCurv
//           </h2>
//           <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
//             <X size={24} />
//           </button>
//         </div>

//         <nav className="space-y-2 px-6">
//           {[
//             { to: ".", label: "Home", icon: <Home size={18} /> },
//             { to: "students", label: "Students", icon: <Users size={18} /> },
//             { to: "teachers", label: "Teachers", icon: <User size={18} /> },
//             { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
//             {
//               to: "attendance",
//               label: "Attendance",
//               icon: <BookOpen size={18} />,
//             },
//             { to: "devices", label: "Devices", icon: <Server size={18} /> },
//           ].map(({ to, label, icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium ${
//                   isActive
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 } transition-colors`
//               }
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               {icon}
//               {label}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="p-6 mt-auto border-t border-gray-200">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 overflow-x-hidden">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default INSTITUTION;

import { NavLink, Outlet } from "react-router-dom";
import {
  Users,
  BookOpen,
  Home,
  User,
  LogOut,
  Server,
  Menu,
  X,
  LucideAlarmClock,
  LucideAlarmClockMinus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PreventBack from "../../components/PreventBack";
import { useState, useEffect } from "react";

const INSTITUTION = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 overflow-x-hidden relative">
      <PreventBack />

      <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-4 py-3 z-50 md:hidden">
        <div className="relative flex items-center">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="bg-blue-100 hover:bg-blue-200 transition p-2 rounded-md"
          >
            <Menu size={24} className="text-blue-600" />
          </button>

          {/* Centered Title */}
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">
            ShantShiv
          </h2>
        </div>
      </div>

      {/* Dark overlay when sidebar is open */}
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
        </div>

        <nav className="space-y-2 px-6">
          {[
            { to: ".", label: "Home", icon: <Home size={18} /> },
            { to: "students", label: "Students", icon: <Users size={18} /> },
            { to: "teachers", label: "Teachers", icon: <User size={18} /> },
            { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
            {
              to: "attendance",
              label: "Attendance",
              icon: <BookOpen size={18} />,
            },
            { to: "devices", label: "Devices", icon: <Server size={18} /> },
            { to: "account", label: "Account", icon: <User size={18} /> },
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10 transition-all duration-200">
        <Outlet />
      </main>
    </div>
  );
};

export default INSTITUTION;
