// const Footer = () => {
//   return (
//     <footer className="py-6 bg-gray-100 text-center text-gray-700 hover:text-blue-600 transition-all">
//       <p>&copy; {new Date().getFullYear()} RFID Attendance System.</p>
//     </footer>
//   );
// };

// export default Footer;

// import { motion } from "framer-motion";

// export default function Footer() {
//   return (
//     <motion.footer
//       className="py-8 bg-gray-100 text-center text-gray-700"
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//     >
//       <p>&copy; {new Date().getFullYear()} RFID Attendance System. All rights reserved.</p>
//     </motion.footer>
//   );
// }

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 px-6 md:px-12 font-extralight font-mono">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl  font-bold text-white mb-2">
            <span className="font-sans text-red-600">Shant</span>
            <span className="mr-1"></span>
            <span className="text-white">Shiv</span>{" "}
            <span className="text-blue-500">Technologies</span>
            <br />
            <p className="text-lg text-slate-400">RFID Attendance System</p>
          </h2>
          <p className="text-sm font-sans leading-relaxed text-gray-400">
            Simplifying attendance management for Schools, Colleges &
            Organizations. Automate, Monitor & Analyze attendance in real-time.
          </p>
        </div>

        {/* Spacer for small screens */}
        <div className="hidden md:block"></div>

        {/* Contact */}
        <div>
          <h3 className="text-lg space-y-2 font-semibold text-white mb-1">
            Contact
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            support@shantshiv.com
          </p>
          <p className="text-sm text-gray-400">+91 7411361004</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-4 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShantShiv. All rights reserved.
      </div>
    </footer>
  );
}
