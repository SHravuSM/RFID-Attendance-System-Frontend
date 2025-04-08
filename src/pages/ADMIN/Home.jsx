import {
  Users,
  User,
  School,
  CalendarDays,
  AlertCircle,
  PlusCircle,
  FileDown,
  Bell,
  TrendingUp,
  ServerCog,
  Settings,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const AHome = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const stats = [
    {
      label: "Total Schools",
      value: "38",
      icon: School,
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Registered Students",
      value: "19,732",
      icon: Users,
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Total Teachers",
      value: "1,432",
      icon: User,
      color: "bg-green-100 text-green-700",
    },
    {
      label: "Attendance Rate",
      value: "89%",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const platformStats = [
    {
      label: "Active RFID Devices",
      value: "212",
      icon: ServerCog,
      color: "bg-pink-100 text-pink-700",
    },
    {
      label: "Pending School Requests",
      value: "7",
      icon: ShieldCheck,
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Total Sub-Admins",
      value: "38",
      icon: Settings,
      color: "bg-teal-100 text-teal-700",
    },
    {
      label: "System Uptime",
      value: "99.97%",
      icon: BarChart3,
      color: "bg-gray-100 text-gray-700",
    },
  ];

  const alerts = [
    { text: "7 new schools requested RFID service", action: "Review" },
    { text: "5 sub-admin verification pending", action: "Verify" },
    { text: "Device synchronization failure in 3 schools", action: "Check" },
  ];

  const activities = [
    "✅ School 'Green Valley' onboarded today",
    "🔄 Attendance data synced successfully (12:30 PM)",
    "➕ New Sub-admin 'Mr. Ravi' added yesterday",
  ];

  const events = [
    { title: "Annual Data Review Meeting - 5th April", action: "View Agenda" },
    { title: "New Feature Rollout - 10th April", action: "Learn More" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-6 rounded-xl text-white shadow-md flex flex-col md:flex-row justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome back, Admin 👑</h2>
          <p className="text-sm text-indigo-100">
            Platform Dashboard Overview - {today}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <NavLink
            to="assign-device"
            className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            <PlusCircle size={16} /> Assign Device
          </NavLink>
          <button className="flex items-center gap-2 bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">
            <FileDown size={16} /> Export Full Report
          </button>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {platformStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className={`p-3 rounded-full ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts & Notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-red-500" />
            <h3 className="text-lg font-semibold text-red-600">
              System Alerts
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
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
      </div>
    </div>
  );
};

export default AHome;
