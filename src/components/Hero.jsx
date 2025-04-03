// import { motion } from "framer-motion";

// export default function Hero() {
//   return (
//     <section className="h-screen flex flex-col justify-center items-center relative bg-gradient-to-br from-blue-50 to-white overflow-hidden">
//       {/* Floating Blobs */}
//       <div className="absolute w-96 h-96 bg-blue-200 rounded-full -top-32 -left-32 blur-3xl opacity-30 animate-pulse"></div>
//       <div className="absolute w-80 h-80 bg-purple-200 rounded-full -bottom-20 -right-20 blur-3xl opacity-30 animate-pulse"></div>

//       <motion.h2
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9 }}
//         className="text-5xl font-extrabold text-gray-800 text-center mb-6 leading-tight"
//       >
//         Automate Attendance<br />with RFID Technology
//       </motion.h2>

//       <motion.p
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.3, duration: 0.8 }}
//         className="text-lg text-gray-600 text-center max-w-xl mb-8"
//       >
//         Accurate, real-time attendance tracking with automated notifications and live dashboards.
//       </motion.p>

//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition"
//       >
//         Request Demo
//       </motion.button>
//     </section>
//   );
// }

// import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

export default function Hero({onGetStartedClick}) {
  return (
    <section className="flex flex-col font-mono items-center justify-center text-center gap-6 pt-24 pb-8 px-4 bg-gradient-to-br from-blue-50 to-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold text-gray-800 max-w-3xl"
      >
        Revolutionize Attendance with{" "}
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          RFID Smart System
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-600 max-w-xl text-lg"
      >
        Next-gen attendance system for Schools, Colleges & Organizations. Automate, Monitor & Manage attendance in real-time.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="flex gap-4"
      >
        {/* <Link */}
          {/* // to="/login" */}
          <button onClick={onGetStartedClick}
          className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Get Started
        </button>
        {/* </Link> */}
        <a
          href="#features"
          className="px-6 py-3 rounded-full font-medium text-blue-600 border border-blue-500 hover:bg-blue-50 transition"
        >
          Learn More
        </a>
      </motion.div>
    </section>
  );
}