// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [schoolId, setSchoolId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!schoolId || !password) {
//       setError("Please enter both School ID and Password.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/school-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ schoolId, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         navigate(`/dashboard/${data.schoolId}`);
//       } else {
//         setError(data.message || "Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       setError("Unable to connect. Please try again later.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Principal Login
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div>
//             <label
//               htmlFor="schoolId"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               School ID
//             </label>
//             <input
//               id="schoolId"
//               type="text"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
//               value={schoolId}
//               onChange={(e) => setSchoolId(e.target.value)}
//               placeholder="Enter your School ID"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your Password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition"
//           >
//             Sign In
//           </button>
//         </form>

//         {error && (
//           <p className="text-red-500 text-sm text-center mt-4">{error}</p>
//         )}

//         <p className="text-center text-xs text-gray-400 mt-6">
//           © {new Date().getFullYear()} RFID Attendance Panel
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { motion, useMotionValue, useTransform, animate } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [schoolId, setSchoolId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const rotateX = useMotionValue(0);
//   const rotateY = useMotionValue(0);

//   const handleMouseMove = (e) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     const rotateAmountX = ((y - centerY) / centerY) * 10; // increased to 10°
//     const rotateAmountY = ((x - centerX) / centerX) * 10;

//     animate(rotateX, -rotateAmountX, { duration: 0.2, ease: "easeOut" });
//     animate(rotateY, rotateAmountY, { duration: 0.2, ease: "easeOut" });
//   };

//   const handleMouseLeave = () => {
//     animate(rotateX, 0, { duration: 0.3, ease: "easeOut" });
//     animate(rotateY, 0, { duration: 0.3, ease: "easeOut" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!schoolId || !password) {
//       setError("Please enter both School ID and Password.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/school-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ schoolId, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         navigate(`/dashboard/${data.schoolId}`);
//       } else {
//         setError(data.message || "Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       setError("Unable to connect. Please try again later.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <motion.div
//         style={{
//           rotateX,
//           rotateY,
//           transformPerspective: 1000,
//         }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 transition-all duration-200"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Principal Login
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="group">
//             <label
//               htmlFor="schoolId"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               School ID
//             </label>
//             <input
//               id="schoolId"
//               type="text"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700"
//               value={schoolId}
//               onChange={(e) => setSchoolId(e.target.value)}
//               placeholder="Enter your School ID"
//             />
//           </div>
//           <div className="group">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your Password"
//             />
//           </div>

//           <motion.button
//             type="submit"
//             whileHover={{
//               scale: 1.04,
//               boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
//             }}
//             whileTap={{ scale: 0.97 }}
//             className="bg-gray-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
//           >
//             Sign In
//           </motion.button>
//         </form>

//         {error && (
//           <p className="text-red-500 text-sm text-center mt-4">{error}</p>
//         )}

//         <p className="text-center text-xs text-gray-400 mt-6">
//           © {new Date().getFullYear()} RFID Attendance Panel
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { motion, useMotionValue, animate } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [schoolId, setSchoolId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const rotateX = useMotionValue(0);
//   const rotateY = useMotionValue(0);

//   const handleMouseMove = (e) => {
//     const card = e.currentTarget;
//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     const centerX = rect.width / 2;
//     const centerY = rect.height / 2;

//     const rotateAmountX = ((y - centerY) / centerY) * 10;
//     const rotateAmountY = ((x - centerX) / centerX) * 10;

//     animate(rotateX, -rotateAmountX, { duration: 0.2, ease: "easeOut" });
//     animate(rotateY, rotateAmountY, { duration: 0.2, ease: "easeOut" });
//   };

//   const handleMouseLeave = () => {
//     animate(rotateX, 0, { duration: 0.3, ease: "easeOut" });
//     animate(rotateY, 0, { duration: 0.3, ease: "easeOut" });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!schoolId || !password) {
//       setError("Please enter both School ID and Password.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/school-login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ schoolId, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         navigate(`/dashboard/${data.schoolId}`);
//       } else {
//         setError(data.message || "Invalid credentials. Please try again.");
//       }
//     } catch (err) {
//       setError("Unable to connect. Please try again later.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <motion.div
//         style={{
//           rotateX,
//           rotateY,
//           transformPerspective: 1000,
//         }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="relative bg-gray-50 p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl transition-all duration-200"
//         // 3D Effect Styling
//         style={{
//           rotateX,
//           rotateY,
//           transformPerspective: 1000,
//           background: "gray/10",
//           boxShadow:
//             "8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff, inset 1px 1px 2px #ffffff, inset -1px -1px 2px #c5c5c5",
//         }}
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Principal Login
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="group">
//             <label
//               htmlFor="schoolId"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               School ID
//             </label>
//             <input
//               id="schoolId"
//               type="text"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700 bg-gray-50"
//               value={schoolId}
//               onChange={(e) => setSchoolId(e.target.value)}
//               placeholder="Enter your School ID"
//             />
//           </div>
//           <div className="group">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700 bg-gray-50"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your Password"
//             />
//           </div>

//           <motion.button
//             type="submit"
//             whileHover={{
//               scale: 1.05,
//               boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
//             }}
//             whileTap={{ scale: 0.97 }}
//             className="bg-gray-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
//           >
//             Sign In
//           </motion.button>
//         </form>

//         {error && (
//           <p className="text-red-500 text-sm text-center mt-4">{error}</p>
//         )}

//         <p className="text-center text-xs text-gray-400 mt-6">
//           © {new Date().getFullYear()} RFID Attendance Panel
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [schoolId, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateAmountX = ((y - centerY) / centerY) * 10;
    const rotateAmountY = ((x - centerX) / centerX) * 10;

    animate(rotateX, -rotateAmountX, { duration: 0.2, ease: "easeOut" });
    animate(rotateY, rotateAmountY, { duration: 0.2, ease: "easeOut" });
  };

  const handleMouseLeave = () => {
    animate(rotateX, 0, { duration: 0.3, ease: "easeOut" });
    animate(rotateY, 0, { duration: 0.3, ease: "easeOut" });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!schoolId || !password) {
      setError("Please enter both School ID and Password.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/school-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schoolId, password }),
      });

      const data = await res.json();

      if (res.ok) {
        navigate(`/dashboard/${data.schoolId}`);
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Unable to connect. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          background: "gray/30",
          boxShadow:
            "8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff, inset 1px 1px 2px #ffffff, inset -1px -1px 2px #c5c5c5",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`relative bg-gray-50 p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl transition-all duration-200 ${
          isHovered ? "shadow-glow" : ""
        }`}
        // style={{
        //   rotateX,
        //   rotateY,
        //   transformPerspective: 1000,
        //   background: "gray/30",
        //   boxShadow:
        //     "8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff, inset 1px 1px 2px #ffffff, inset -1px -1px 2px #c5c5c5",
        // }}
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Principal Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="group">
            <label
              htmlFor="schoolId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              School ID
            </label>
            <input
              id="schoolId"
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700 bg-gray-50"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              placeholder="Enter your School ID"
            />
          </div>
          <div className="group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700 bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            className="bg-gray-800 text-white py-3 rounded-lg font-medium transition-all duration-300"
          >
            Sign In
          </motion.button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} RFID Attendance Panel
        </p>
      </motion.div>
      {/* Glow effect styling */}
      <style>{`
        .shadow-glow {
          box-shadow:
            0 0 10px rgba(0,0,0,0.08),
            0 0 30px rgba(0,0,0,0.06),
            0 0 60px rgba(0,0,0,0.04);
          transition: box-shadow 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Login;