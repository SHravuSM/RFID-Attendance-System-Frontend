// import {
//   Users,
//   User,
//   BookOpen,
//   CalendarDays,
//   AlertCircle,
//   PlusCircle,
//   FileDown,
//   Bell,
//   TrendingUp,
// } from "lucide-react";

// const SubHomeWelcome = () => {
//   const today = new Date().toLocaleDateString("en-GB", {
//     weekday: "long",
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });

//   return (
//     <div className="space-y-8">
//       {/* Welcome Banner */}
//       <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl text-white shadow-md flex flex-col md:flex-row justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold mb-2">Welcome back, Principal 👋</h2>
//           <p className="text-sm text-blue-100">Your school's dashboard overview - {today}</p>
//         </div>
//         <div className="mt-4 md:mt-0 flex gap-3">
//           <button className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
//             <PlusCircle size={16} /> Add Student
//           </button>
//           <button className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
//             <FileDown size={16} /> Download Report
//           </button>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         {[
//           { label: "Students", value: "523", icon: Users, color: "bg-blue-100 text-blue-700" },
//           { label: "Teachers", value: "27", icon: User, color: "bg-green-100 text-green-700" },
//           { label: "Classes", value: "14", icon: BookOpen, color: "bg-purple-100 text-purple-700" },
//           { label: "Attendance Today", value: "92%", icon: TrendingUp, color: "bg-yellow-100 text-yellow-700" },
//         ].map((stat, idx) => (
//           <div
//             key={idx}
//             className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition"
//           >
//             <div className={`p-3 rounded-full ${stat.color}`}>
//               <stat.icon size={24} />
//             </div>
//             <div>
//               <p className="text-gray-500 text-sm">{stat.label}</p>
//               <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Alerts & Notifications */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-2 mb-4">
//             <AlertCircle size={20} className="text-red-500" />
//             <h3 className="text-lg font-semibold text-red-600">Urgent Alerts</h3>
//           </div>
//           <ul className="space-y-3 text-gray-700 text-sm">
//             <li className="flex justify-between">
//               3 students absent for 3+ days
//               <span className="text-blue-600 cursor-pointer hover:underline">View</span>
//             </li>
//             <li className="flex justify-between">
//               Attendance pending for Class 9-B
//               <span className="text-blue-600 cursor-pointer hover:underline">Mark Now</span>
//             </li>
//             <li className="flex justify-between">
//               New teacher verification pending
//               <span className="text-blue-600 cursor-pointer hover:underline">Review</span>
//             </li>
//           </ul>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center gap-2 mb-4">
//             <Bell size={20} className="text-yellow-500" />
//             <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
//           </div>
//           <ul className="space-y-3 text-gray-700 text-sm">
//             <li>✅ Attendance marked for Class 10-A at 9:05 AM</li>
//             <li>➕ New teacher "Mrs. Rani" added yesterday</li>
//             <li>🔄 Class timings updated for Class 6-B</li>
//           </ul>
//         </div>
//       </div>

//       {/* Upcoming Events */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Upcoming Events</h3>
//         <ul className="space-y-3 text-gray-700 text-sm">
//           <li className="flex justify-between">
//             <span>📌 Parent-Teacher Meeting - 2nd April</span>
//             <span className="text-blue-600 cursor-pointer hover:underline">View Details</span>
//           </li>
//           <li className="flex justify-between">
//             <span>📌 Annual Sports Day - 20th April</span>
//             <span className="text-blue-600 cursor-pointer hover:underline">View Details</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SubHomeWelcome;

import {
  Users,
  User,
  BookOpen,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  FileDown,
  Bell,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SubHomeWelcome = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const stats = [
    {
      label: "Students",
      value: "523",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Teachers",
      value: "27",
      icon: User,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Classes",
      value: "14",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-700",
    },
    {
      label: "Attendance Today",
      value: "92%",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const alerts = [
    { text: "3 students absent for 3+ days", action: "View" },
    { text: "Attendance pending for Class 9-B", action: "Mark Now" },
    { text: "New teacher verification pending", action: "Review" },
  ];

  const activities = [
    "✅ Attendance marked for Class 10-A at 9:05 AM",
    "➕ New teacher 'Mrs. Rani' added yesterday",
    "🔄 Class timings updated for Class 6-B",
  ];

  const events = [
    { title: "Parent-Teacher Meeting - 2nd April", action: "View Details" },
    { title: "Annual Sports Day - 20th April", action: "View Details" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl text-white shadow-md flex flex-col md:flex-row justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, Principal 👋
          </h2>
          <p className="text-sm text-blue-100">
            Your school's dashboard overview - {today}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Link
            to="/subhome/add-student"
            className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            <PlusCircle size={16} /> Add Student
          </Link>
          <button className="flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
            <FileDown size={16} /> Download Report
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alerts & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Urgent Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-red-500" />
            <h3 className="text-lg font-semibold text-red-600">
              Urgent Alerts
            </h3>
          </div>
          <ul className="space-y-3 text-gray-700 text-sm">
            {alerts.map((alert, idx) => (
              <li key={idx} className="flex justify-between">
                {alert.text}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  {alert.action}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell size={20} className="text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activities
            </h3>
          </div>
          <ul className="space-y-3 text-gray-700 text-sm">
            {activities.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          📅 Upcoming Events
        </h3>
        <ul className="space-y-3 text-gray-700 text-sm">
          {events.map((event, idx) => (
            <li key={idx} className="flex justify-between">
              <span>📌 {event.title}</span>
              <span className="text-blue-600 cursor-pointer hover:underline">
                {event.action}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default SubHomeWelcome;