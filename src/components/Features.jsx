// import { motion } from "framer-motion";

// const Features = () => {
//   const features = [
//     { title: "Auto Attendance", desc: "RFID-based auto entry & exit detection." },
//     { title: "Live Dashboard", desc: "Track attendance in real-time." },
//     { title: "Notifications", desc: "Alerts for latecomers and absentees." },
//   ];

//   return (
//     <section id="features" className="py-20 bg-white max-w-6xl mx-auto px-4">
//       <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Features You'll Love</h3>
//       <div className="grid md:grid-cols-3 gap-10">
//         {features.map((f, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.2 }}
//             className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-xl transition-all"
//           >
//             <h4 className="text-xl font-semibold mb-2 text-blue-600">{f.title}</h4>
//             <p className="text-gray-700">{f.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Features;

import { motion } from "framer-motion";

export default function Features() {
  const featureList = [
    { title: "Auto Attendance", desc: "RFID-based automatic entry & exit logging." },
    { title: "Live Dashboard", desc: "Monitor attendance in real-time with analytics." },
    { title: "Parent Alerts", desc: "Notify parents when students are absent or late." },
  ];

  return (
    <section className="py-10 bg-white max-w-6xl mx-auto px-6">
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-extralight text-center mb-10 text-gray-800"
      >
        Features You'll Love
      </motion.h3>

      <div className="grid md:grid-cols-3 gap-10">
        {featureList.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-lg border hover:shadow-xl transition"
          >
            <h4 className="text-2xl font-semibold mb-3 text-blue-700">{f.title}</h4>
            <p className="text-gray-700">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}