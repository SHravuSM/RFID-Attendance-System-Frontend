// // first just analyze this design pattern and UI styling, next i will tell what to do,
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
//   LucideAlarmClock,
//   LucideAlarmClockMinus,
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

//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 overflow-x-hidden relative">
//       <PreventBack />

//       <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow-md px-4 py-3 z-50 md:hidden">
//         <div className="relative flex items-center">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="bg-blue-100 hover:bg-blue-200 transition p-2 rounded-md"
//           >
//             <Menu size={24} className="text-blue-600" />
//           </button>

//           {/* Centered Title */}
//           <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-gray-800">
//             ShantShiv
//           </h2>
//         </div>
//       </div>

//       {/* Dark overlay when sidebar is open */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 backdrop-blur-md shadow-md z-40 md:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } fixed md:static top-0 left-0 z-50 h-full w-64 bg-white md:rounded-none rounded-tr-2xl rounded-br-2xl shadow-xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0`}
//       >
//         <div className="p-6 flex justify-between items-center md:block">
//           <button
//             onClick={() => setIsSidebarOpen(false)}
//             className="md:hidden text-gray-500 hover:text-gray-700"
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
//             { to: "account", label: "Account", icon: <User size={18} /> },
//           ].map(({ to, label, icon }) => (
//             <NavLink
//               key={to}
//               to={to}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//                   isActive
//                     ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//                 }`
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
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition"
//           >
//             <LogOut size={16} />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10 transition-all duration-200">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default INSTITUTION;

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";
// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const navLinks = [
//   { to: ".", label: "Home", icon: <Home size={18} /> },
//   { to: "students", label: "Students", icon: <Users size={18} /> },
//   { to: "teachers", label: "Teachers", icon: <User size={18} /> },
//   { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
//   { to: "attendance", label: "Attendance", icon: <BookOpen size={18} /> },
//   { to: "devices", label: "Devices", icon: <Server size={18} /> },
//   { to: "account", label: "Account", icon: <User size={18} /> },
// ];

// const sidebarVariants = {
//   hidden: { x: "-100%" },
//   visible: { x: 0, transition: { duration: 0.25 } },
//   exit: { x: "-100%", transition: { duration: 0.2 } },
// };

// const INSTITUTION = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex min-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 overflow-x-hidden relative">
//       <PreventBack />

//       {/* Mobile Nav Header */}
//       <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow px-4 py-3 z-50 md:hidden">
//         <div className="relative flex items-center justify-between">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="bg-blue-100 hover:bg-blue-200 transition p-2 rounded-md"
//           >
//             <Menu size={22} className="text-blue-600" />
//           </button>
//           <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-gray-800 tracking-wide">
//             ShantShiv
//           </h2>
//         </div>
//       </div>

//       {/* Sidebar for Mobile - Sliding */}
//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//               onClick={() => setIsSidebarOpen(false)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
//             <motion.aside
//               className="fixed top-0 left-0 z-50 h-full w-64 bg-white/80 backdrop-blur-lg shadow-2xl rounded-tr-2xl rounded-br-2xl p-6 flex flex-col"
//               variants={sidebarVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               <div className="flex justify-between items-center mb-6">
//                 <span className="text-xl font-semibold text-gray-800">Menu</span>
//                 <button onClick={() => setIsSidebarOpen(false)}>
//                   <X size={22} className="text-gray-500" />
//                 </button>
//               </div>
//               <SidebarLinks onClickLink={() => setIsSidebarOpen(false)} />
//               <SidebarLogout onLogout={handleLogout} />
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Sidebar for Desktop */}
//       <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white/70 backdrop-blur-lg shadow-md border-r border-gray-200 p-6">
//         <div className="text-2xl font-bold text-blue-700 tracking-wider mb-8">
//           ShantShiv
//         </div>
//         <SidebarLinks />
//         <SidebarLogout onLogout={handleLogout} />
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10 transition-all">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// // Sidebar Navigation Items
// const SidebarLinks = ({ onClickLink = () => {} }) => (
//   <nav className="space-y-2">
//     {navLinks.map(({ to, label, icon }) => (
//       <NavLink
//         key={to}
//         to={to}
//         onClick={onClickLink}
//         className={({ isActive }) =>
//           `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
//             isActive
//               ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow"
//               : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//           }`
//         }
//       >
//         <span className="group-hover:scale-110 transition-transform duration-200">
//           {icon}
//         </span>
//         {label}
//       </NavLink>
//     ))}
//   </nav>
// );

// // Logout Button
// const SidebarLogout = ({ onLogout }) => (
//   <div className="mt-auto pt-6 border-t border-gray-200">
//     <button
//       onClick={onLogout}
//       className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
//     >
//       <LogOut size={16} />
//       Logout
//     </button>
//   </div>
// );

// export default INSTITUTION;

// import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
// import { useAuth } from "../../context/AuthContext";
// import PreventBack from "../../components/PreventBack";
// import { useState, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";

// const navLinks = [
//   { to: ".", label: "Home", icon: <Home size={18} /> },
//   { to: "students", label: "Students", icon: <Users size={18} /> },
//   { to: "teachers", label: "Teachers", icon: <User size={18} /> },
//   { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
//   { to: "attendance", label: "Attendance", icon: <BookOpen size={18} /> },
//   { to: "devices", label: "Devices", icon: <Server size={18} /> },
//   { to: "account", label: "Account", icon: <User size={18} /> },
// ];

// const sidebarVariants = {
//   hidden: { x: "-100%" },
//   visible: { x: 0, transition: { duration: 0.25 } },
//   exit: { x: "-100%", transition: { duration: 0.2 } },
// };

// const INSTITUTION = () => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   useEffect(() => {
//     document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
//   }, [isSidebarOpen]);

//   return (
//     <div className="flex max-h-screen bg-gradient-to-tr from-blue-50 to-gray-100 overflow-x-hidden relative">
//       <PreventBack />

//       {/* Mobile Nav Header */}
//       <div className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md shadow px-4 py-3 z-50 md:hidden">
//         <div className="relative flex items-center justify-between">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="bg-blue-100 hover:bg-blue-200 transition p-2 rounded-md"
//           >
//             <Menu size={22} className="text-blue-600" />
//           </button>
//           <div className="text-2xl text-blue-700 tracking-wider mr-14 font-sans font-light">
//             Meteor Technologies
//           </div>
//         </div>
//       </div>

//       {/* Sidebar for Mobile - Sliding */}
//       <AnimatePresence>
//         {isSidebarOpen && (
//           <>
//             <motion.div
//               className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
//               onClick={() => setIsSidebarOpen(false)}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             />
//             <motion.aside
//               className="fixed top-0 left-0 z-50 h-full w-64 bg-white/80 backdrop-blur-lg shadow-2xl rounded-tr-2xl rounded-br-2xl p-6 flex flex-col"
//               variants={sidebarVariants}
//               initial="hidden"
//               animate="visible"
//               exit="exit"
//             >
//               {/* <div className="flex justify-between items-center mb-6">
//                 <span className="text-xl font-semibold text-center ml-16 text-gray-800">
//                   Menu
//                 </span>
//                 <button onClick={() => setIsSidebarOpen(false)}>
//                   <X size={22} className="text-gray-500" />
//                 </button>
//               </div> */}
//               <SidebarLinks onClickLink={() => setIsSidebarOpen(false)} />
//               <SidebarLogout onLogout={handleLogout} />
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Sidebar for Desktop */}
//       <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white/70 backdrop-blur-lg shadow-md border-r border-gray-200 p-6">
//         <div className="text-2xl text-blue-700 tracking-wider text-center mb-5 font-sans font-light">
//           Meteor Technologies
//         </div>
//         <SidebarLinks />
//         <SidebarLogout onLogout={handleLogout} />
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10 transition-all">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// // Sidebar Navigation Items
// const SidebarLinks = ({ onClickLink = () => {} }) => (
//   <nav className="space-y-2">
//     <h2 className="text-center mb-3 font">Meteor</h2>
//     {navLinks.map(({ to, label, icon }) => (
//       <NavLink
//         key={to}
//         to={to}
//         onClick={onClickLink}
//         className={({ isActive }) =>
//           `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
//             isActive
//               ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow"
//               : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
//           }`
//         }
//       >
//         <span className="group-hover:scale-110 transition-transform duration-200">
//           {icon}
//         </span>
//         {label}
//       </NavLink>
//     ))}
//   </nav>
// );

// // Logout Button
// const SidebarLogout = ({ onLogout }) => (
//   <div className="mt-auto pt-6 border-t border-gray-200">
//     <button
//       onClick={onLogout}
//       className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
//     >
//       <LogOut size={16} />
//       Logout
//     </button>
//   </div>
// );

// export default INSTITUTION;

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  Home,
  User,
  LogOut,
  Server,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import PreventBack from "../../components/PreventBack";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { to: ".", label: "Home", icon: <Home size={18} /> },
  { to: "students", label: "Students", icon: <Users size={18} /> },
  { to: "teachers", label: "Teachers", icon: <User size={18} /> },
  { to: "classes", label: "Classes", icon: <BookOpen size={18} /> },
  { to: "attendance", label: "Attendance", icon: <BookOpen size={18} /> },
  { to: "devices", label: "Devices", icon: <Server size={18} /> },
  { to: "account", label: "Account", icon: <User size={18} /> },
];

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0, transition: { duration: 0.25 } },
  exit: { x: "-100%", transition: { duration: 0.2 } },
};

const INSTITUTION = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
  }, [isSidebarOpen]);

  return (
    <div className="flex bg-gradient-to-tr from-blue-50 to-gray-100 relative h-screen overflow-hidden">
      <PreventBack />

      {/* Mobile Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg shadow px-4 py-3 z-50 md:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md bg-white/30 backdrop-blur-md shadow hover:bg-white/50 transition"
          >
            <Menu className="text-blue-600" size={22} />
          </button>
          <div className="text-2xl text-blue-700 tracking-wider text-center font-light">
            Meteor Technologies
          </div>
          <div></div>
        </div>
      </div>

      {/* Sidebar for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={() => setIsSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed top-0 left-0 z-50 h-full w-64 bg-white/60 backdrop-blur-xl shadow-2xl rounded-tr-2xl rounded-br-2xl p-6 flex flex-col"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-800">
                  Menu
                </span>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X size={22} className="text-gray-600" />
                </button>
              </div>
              <SidebarLinks onClickLink={() => setIsSidebarOpen(false)} />
              <SidebarLogout onLogout={handleLogout} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 h-full fixed left-0 top-0 z-30 bg-white/60 backdrop-blur-xl shadow-lg border-r border-gray-200 p-6">
        <div className="text-2xl text-blue-700 tracking-wider text-center mb-5 font-light">
          Meteor Technologies
        </div>
        <SidebarLinks />
        <SidebarLogout onLogout={handleLogout} />
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 ml-0 md:ml-64 overflow-y-auto h-screen">
        <main className="min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 pt-20 md:pt-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const SidebarLinks = ({ onClickLink = () => {} }) => (
  <nav className="space-y-2">
    {/* <h2 className="text-center mb-3 text-sm font-semibold text-gray-500">
      Dashboard
    </h2> */}
    {navLinks.map(({ to, label, icon }) => (
      <NavLink
        key={to}
        to={to}
        onClick={onClickLink}
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
            isActive
              ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow"
              : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
          }`
        }
      >
        <span className="group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
        {label}
      </NavLink>
    ))}
  </nav>
);

const SidebarLogout = ({ onLogout }) => (
  <div className="mt-auto pt-6 border-t border-gray-200">
    <button
      onClick={onLogout}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      <LogOut size={16} />
      Logout
    </button>
  </div>
);

export default INSTITUTION;
