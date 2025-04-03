// import React, { useEffect, useState } from "react";
// import Loader from "./Loader";

// export default function AddStudent() {
//   const [rfid, setRfid] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     class: "",
//     rollNumber: "",
//     parentName: "",
//     parentContactNumber: "",
//     schoolName: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/rfid/unregistered");
//         const data = await res.json();
//         if (data.rfid) {
//           setRfid(data.rfid);
//           setShowModal(true);
//           clearInterval(interval);
//         }
//       } catch (err) {
//         console.error("Error fetching RFID:", err);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleOptionChange = async (e) => {
//     const schools = fetch("http://localhost:3000/api/schools");
//     console.log(schools);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const res = await fetch("http://localhost:3000/api/rfid/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...formData, rfid }),
//       });
//       const data = await res.json();
//       if (data.success) {
//         alert("Student Registered Successfully!");
//         setShowModal(false);
//         setFormData({ name: "", class: "", rollNumber: "" });
//       } else {
//         alert("Failed to register student");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting data");
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="p-6 flex flex-col items-center justify-center h-[80vh] bg-gray-100">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Student</h2>

//       {rfid ? (
//         <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-md flex items-center gap-3">
//           <span className="text-2xl">✅</span>
//           <div>
//             <p className="font-medium">RFID Detected Successfully</p>
//             <p className="font-mono text-sm">{rfid}</p>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-col items-center gap-4">
//           <p className="text-lg font-medium text-gray-700">
//             Waiting for RFID card scan...
//           </p>
//           <Loader />
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[400px] relative transform transition-all duration-300">
//             <h3 className="text-xl font-semibold mb-4 text-gray-800">
//               Register Student
//             </h3>
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   RFID UID
//                 </label>
//                 <input
//                   type="text"
//                   value={rfid}
//                   disabled
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   School Name
//                 </label>
//                 <option onClick={handleOptionChange}>
//                   Select School Name
//                 </option>
//                 <input
//                   type="text"
//                   name="schoolName"
//                   value={formData.schoolName}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Student Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Parent Name
//                 </label>
//                 <input
//                   type="text"
//                   name="parentName"
//                   value={formData.parentName}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Class
//                 </label>
//                 <input
//                   type="text"
//                   name="class"
//                   value={formData.class}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Roll Number
//                 </label>
//                 <input
//                   type="text"
//                   name="rollNumber"
//                   value={formData.rollNumber}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-1">
//                   Roll Number
//                 </label>
//                 <input
//                   type="text"
//                   name="parentContactNumber"
//                   value={formData.parentContactNumber}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div className="flex justify-end gap-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Loader from "./Loader";

export default function AddStudent() {
  const [rfid, setRfid] = useState(null);
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    rollNumber: "",
    parentName: "",
    parentContactNumber: "",
    schoolName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/schools");
        const data = await res.json();
        console.log(data);
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };
    fetchSchools();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:3000/api/rfid/unregistered");
        const data = await res.json();
        if (data.rfid) {
          setRfid(data.rfid);
          setShowModal(true);
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error fetching RFID:", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:3000/api/rfid/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rfid }),
      });
      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("Student Registered Successfully!");
        setShowModal(false);
        setFormData({
          name: "",
          class: "",
          rollNumber: "",
          parentName: "",
          parentContactNumber: "",
          schoolName: "",
        });
      } else {
        alert("Failed to register student");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting data");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center h-[80vh] bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Student</h2>

      {rfid ? (
        <div className="bg-green-100 text-green-800 px-6 py-3 rounded-xl shadow-md flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-medium">RFID Detected Successfully</p>
            <p className="font-mono text-sm">{rfid}</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-medium text-gray-700">
            Waiting for RFID card scan...
          </p>
          <Loader />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[400px] relative transform transition-all duration-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Register Student
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  RFID UID
                </label>
                <input
                  type="text"
                  value={rfid}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  School Name
                </label>
                <select
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select School Name</option>
                  {schools.map((school) => (
                    <option key={school._id} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Parent Name
                </label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Class
                </label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Parent Contact Number
                </label>
                <input
                  type="text"
                  name="parentContactNumber"
                  value={formData.parentContactNumber}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}