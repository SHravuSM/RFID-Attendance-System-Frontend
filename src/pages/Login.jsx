// import { useState } from "react";
// import { motion, useMotionValue, animate } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // adjust the path

// const Login = () => {
//   const [Id, setId] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
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
//     setError("");

//     if (!Id || !password) {
//       return setError("Please enter both ID and Password.");
//     }

//     try {
//       const role = await login(Id, password);
//       switch (role) {
//         case "admin":
//           navigate("/ADMIN");
//           break;
//         case "institution":
//           navigate("/Institution");
//           break;
//         case "teacher":
//           navigate("/Teacher"); // or whatever route you define
//           break;
//         default:
//           navigate("/"); // fallback
//       }
//     } catch (err) {
//       console.error("Login failed:", err.message);
//       // Optionally show toast/snackbar here
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//       <motion.div
//         style={{
//           rotateX,
//           rotateY,
//           transformPerspective: 1000,
//           background: "gray/10",
//           boxShadow:
//             "8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff, inset 1px 1px 2px #ffffff, inset -1px -1px 2px #c5c5c5",
//         }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4, ease: "easeOut" }}
//         className="relative bg-gray-50 p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl transition-all duration-200"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
//           Un-Curv Login
//         </h2>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <div className="group">
//             <label
//               htmlFor="Id"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Your Identity
//             </label>
//             <input
//               id="Id"
//               type="text"
//               className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700 bg-gray-50"
//               value={Id}
//               onChange={(e) => setId(e.target.value)}
//               placeholder="Enter your ID"
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
import { useAuth } from "../context/AuthContext"; // adjust the path

const Login = () => {
  const [Id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!Id || !password) {
      return setError("Please enter both ID and Password.");
    }

    try {
      const role = await login(Id, password);
      switch (role) {
        case "admin":
          navigate("/ADMIN");
          break;
        case "institution":
          navigate("/Institution");
          break;
        case "teacher":
          navigate("/Teacher");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);

      // Handle network/server errors
      if (
        err.message === "Failed to fetch" ||
        err.code === "ECONNABORTED" ||
        err.name === "TypeError"
      ) {
        setError("Server is not responding. Please try again later.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          background: "gray/10",
          boxShadow:
            "8px 8px 16px #c5c5c5, -8px -8px 16px #ffffff, inset 1px 1px 2px #ffffff, inset -1px -1px 2px #c5c5c5",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-gray-50 p-8 rounded-2xl w-full max-w-md border border-gray-200 shadow-xl transition-all duration-200"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          ctrl-Curv Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="group">
            <label
              htmlFor="Id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Identity
            </label>
            <input
              id="Id"
              type="text"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition group-hover:border-gray-700 bg-gray-50"
              value={Id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your ID"
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
    </div>
  );
};

export default Login;