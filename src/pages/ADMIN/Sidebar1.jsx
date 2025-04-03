// import React from "react";
// import { Home, ClipboardList, School } from "lucide-react";

// export default function Sidebar({ activeSection, setActiveSection }) {
//   const navItems = [
//     { name: "Home", icon: <Home className="w-5 h-5 mr-3" /> },
//     { name: "ServiceRequest", icon: <ClipboardList className="w-5 h-5 mr-3" /> },
//     { name: "Schools", icon: <School className="w-5 h-5 mr-3" /> },
//   ];

//   return (
//     <div className="w-64 bg-white shadow-lg p-4">
//       <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
//       <nav className="space-y-4">
//         {navItems.map((item) => (
//           <button
//             key={item.name}
//             className={`flex items-center w-full p-2 rounded-lg ${
//               activeSection === item.name
//                 ? "bg-blue-500 text-white"
//                 : "text-gray-700 hover:bg-gray-200"
//             }`}
//             onClick={() => setActiveSection(item.name)}
//           >
//             {item.icon}
//             {item.name === "ServiceRequest" ? "Service Requests" : item.name}
//           </button>
//         ))}
//       </nav>
//     </div>
//   );
// }
import React from "react";
import { Home, ClipboardList, School } from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const navItems = [
    { name: "Home", label: "Dashboard", icon: Home },
    { name: "ServiceRequest", label: "Service Requests", icon: ClipboardList },
    { name: "Schools", label: "Schools", icon: School },
  ];

  return (
    <aside className="w-64 bg-white shadow-xl border-r border-gray-200 p-6 flex flex-col">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-12 text-center">
        Verity Admin
      </h1>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveSection(item.name)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              activeSection === item.name
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto text-center text-sm text-gray-400">
        © 2025 Verity Systems
      </div>
    </aside>
  );
}