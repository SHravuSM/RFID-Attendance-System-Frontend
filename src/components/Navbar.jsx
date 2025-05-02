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
      className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-md shadow-md z-50"
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-4xl font-serif font-medium text-blue-700 tracking-wide"
        >
          RFID Attendance System
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