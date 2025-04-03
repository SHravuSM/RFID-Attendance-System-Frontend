// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50"
//       initial={{ y: -60 }}
//       animate={{ y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-sans font-medium text-blue-700 tracking-wide"
//         >
//           Verity
//         </Link>

//         {/* Desktop Login Button */}
//         <div className="hidden md:flex">
//           <Link to="/login">
//             <button
//               className="px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-500
//         bg-black border-none shadow-md rounded-lg text-white
//         hover:tracking-wider hover:bg-white hover:text-black hover:shadow-lg
//         active:translate-y-[4px] active:shadow-none"
//             >
//               Login
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle Menu"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Login Button */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="md:hidden bg-white px-6 pb-4 shadow-md"
//         >
//           <Link
//             to="/login"
//             className="block w-full text-center py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
//             onClick={() => setIsOpen(false)}
//           >
//             Login
//           </Link>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// }

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [prevScrollY, setPrevScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsVisible(currentScrollY < prevScrollY || currentScrollY < 50);
//       setPrevScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollY]);

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50"
//       initial={{ y: 0 }}
//       animate={{ y: isVisible ? 0 : "-100%" }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-3xl font-sans font-medium text-blue-700 tracking-wide"
//         >
//           Verity
//         </Link>

//         {/* Desktop Login Button */}
//         <div className="hidden md:flex">
//           <Link to="/login">
//             <button
//               className="px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-500
//         bg-black border-none shadow-md rounded-lg text-white
//         hover:tracking-wider hover:bg-white hover:text-black hover:shadow-lg
//         active:translate-y-[4px] active:shadow-none"
//             >
//               Login
//             </button>
//           </Link>
//         </div>

//         {/* Mobile Menu Icon */}
//         <button
//           className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 transition"
//           onClick={() => setIsOpen(!isOpen)}
//           aria-label="Toggle Menu"
//         >
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Mobile Login Button */}
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="md:hidden bg-white px-6 pb-4 shadow-md"
//         >
//           <Link
//             to="/login"
//             className="block w-full text-center py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
//             onClick={() => setIsOpen(false)}
//           >
//             Login
//           </Link>
//         </motion.div>
//       )}
//     </motion.nav>
//   );
// }

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   const [prevScrollY, setPrevScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       setIsVisible(currentScrollY < prevScrollY || currentScrollY < 50);
//       setPrevScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [prevScrollY]);

//   return (
//     <motion.nav
//       className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50"
//       initial={{ y: 0 }}
//       animate={{ y: isVisible ? 0 : "-100%" }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//     >
//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-3xl font-sans font-medium text-blue-700 tracking-wide"
//         >
//           Verity
//         </Link>

//         {/* Login Button (Visible for All Screen Sizes) */}
//         <Link to="/login">
//           <button
//             className="px-8 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-500
//             bg-black border-none shadow-md rounded-lg text-white
//             hover:tracking-wider hover:bg-white hover:text-black hover:shadow-lg
//             active:translate-y-[4px] active:shadow-none"
//           >
//             Login
//           </button>
//         </Link>
//       </div>
//     </motion.nav>
//   );
// }

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi"; // Clean login icon for mobile

export default function Navbar() {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < prevScrollY || currentScrollY < 50);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-md z-50"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-sans font-medium text-blue-700 tracking-wide"
        >
          Verity
        </Link>

        {/* Login Button (Icon for Mobile, Text for Desktop) */}
        <Link to="/login">
          <button
            className="flex items-center justify-center hover:bg-white hover:text-black bg-black text-white border-none shadow-md 
              rounded-lg transition-all duration-500 px-3 py-2 md:px-8 md:py-3"
          >
            {/* Icon for Mobile Screens */}
            <FiLogIn className="w-5 h-6 md:hidden" />

            {/* "Login" Text for Desktop Screens */}
            <span
              className="hidden md:inline uppercase text-sm font-semibold tracking-wide 
              hover:tracking-wider"
            >
              Login
            </span>
          </button>
        </Link>
      </div>
    </motion.nav>
  );
}
