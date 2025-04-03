// const CTA = () => {
//     return (
//       <section id="pricing" className="py-16 bg-blue-600 text-white text-center">
//         <h4 className="text-3xl font-bold mb-4">Simplify Attendance Management</h4>
//         <p className="mb-6 max-w-xl mx-auto">
//           Start using our RFID Attendance System and make attendance effortless & accurate.
//         </p>
//         <button className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100">
//           Register Your School
//         </button>
//       </section>
//     );
//   };
  
//   export default CTA;  

// import { motion } from "framer-motion";

// export default function CTA() {
//   return (
//     <motion.section
//       className="py-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       <h3 className="text-3xl font-bold mb-6">Want to get started?</h3>
//       <p className="text-lg mb-8">Submit your school details and we’ll set it up for you!</p>
//       <button className="bg-white text-blue-700 px-8 py-3 rounded-lg text-lg hover:scale-105 transition shadow-lg">
//         Submit Request
//       </button>

//       {/* Floating background */}
//       <div className="absolute w-96 h-96 bg-white/20 rounded-full -top-40 -left-40 blur-3xl animate-pulse"></div>
//       <div className="absolute w-80 h-80 bg-white/20 rounded-full -bottom-32 -right-32 blur-3xl animate-pulse"></div>
//     </motion.section>
//   );
// }

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.section
      className="py-20 px-6 md:px-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center relative overflow-hidden rounded-xl mx-4 md:mx-12 mt-1 shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to simplify attendance?
      </h3>
      <p className="text-lg md:text-xl mb-8 text-white/90">
        Submit your school details & we’ll set up everything for you in minutes.
      </p>
      <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full text-lg hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg">
        Submit Request
      </button>

      {/* Floating background elements */}
      <div className="absolute w-96 h-96 bg-white/20 rounded-full -top-40 -left-40 blur-3xl animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-white/20 rounded-full -bottom-32 -right-32 blur-3xl animate-pulse"></div>
    </motion.section>
  );
}