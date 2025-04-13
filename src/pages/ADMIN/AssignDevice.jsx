// import React, { useEffect, useState } from "react";
// import api from "../../api";

// export default function AssignDevice() {
//   const [institutions, setInstitutions] = useState([]);
//   const [selectedInstitution, setSelectedInstitution] = useState("");
//   const [deviceId, setDeviceId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [feedback, setFeedback] = useState(null);

//   useEffect(() => {
//     const fetchInstitutions = async () => {
//       try {
//         const res = await api.get(`/admin/institutions`);
//         setInstitutions(res.data || []);
//       } catch (err) {
//         console.error("Error fetching institutions:", err);
//       }
//     };

//     fetchInstitutions();
//   }, []);

//   const handleAssign = async (e) => {
//     e.preventDefault();
//     if (!selectedInstitution || !deviceId) return;

//     setLoading(true);
//     setFeedback(null);
//     try {
//       const res = await api.post(`/admin/institutions/assign-device`, {
//         institutionCode: selectedInstitution,
//         deviceId,
//       });

//       setFeedback({ type: "success", message: res.data.message });
//       setDeviceId("");
//     } catch (err) {
//       console.error(err);
//       setFeedback({
//         type: "error",
//         message: err?.response?.data?.message || "Something went wrong.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Assign RFID Device</h1>
//       <form onSubmit={handleAssign} className="space-y-4">
//         <div>
//           <label htmlFor="institution" className="block font-medium">
//             Select Institution
//           </label>
//           <select
//             id="institution"
//             value={selectedInstitution}
//             onChange={(e) => setSelectedInstitution(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">-- Select --</option>
//             {institutions.map((inst) => (
//               <option key={inst._id} value={inst.institutionCode}>
//                 {inst.institutionName} ({inst.institutionCode})
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="deviceId" className="block font-medium">
//             Device ID
//           </label>
//           <input
//             id="deviceId"
//             type="text"
//             value={deviceId}
//             onChange={(e) => setDeviceId(e.target.value)}
//             placeholder="Enter RFID Device ID"
//             required
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading || !selectedInstitution || !deviceId}
//           className={`px-4 py-2 rounded-md text-white ${
//             loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Assigning..." : "Assign Device"}
//         </button>

//         {feedback && (
//           <p
//             className={`mt-2 text-sm ${
//               feedback.type === "success" ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {feedback.message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../../api";

export default function AssignDevice() {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await api.get(`/admin/institutions`);
        setInstitutions(res.data || []);
      } catch (err) {
        console.error("Error fetching institutions:", err);
      }
    };

    fetchInstitutions();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedInstitution || !deviceId) return;

    setLoading(true);
    setFeedback(null);
    try {
      const res = await api.post(`/admin/institutions/assign-device`, {
        institutionCode: selectedInstitution,
        deviceId,
      });

      setFeedback({ type: "success", message: res.data.message });
      setDeviceId("");
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message: err?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 bg-white/90 backdrop-blur-md shadow-xl rounded-xl mt-28">
      <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
        Assign RFID Device
      </h1>
      <form onSubmit={handleAssign} className="space-y-5">
        {/* Institution Dropdown */}
        <div>
          <label
            htmlFor="institution"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Institution
          </label>
          <select
            id="institution"
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          >
            <option value="">-- Choose Institution --</option>
            {institutions.map((inst) => (
              <option key={inst._id} value={inst.institutionCode}>
                {inst.institutionName} ({inst.institutionCode})
              </option>
            ))}
          </select>
        </div>

        {/* Device ID Input */}
        <div>
          <label
            htmlFor="deviceId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Device ID
          </label>
          <input
            id="deviceId"
            type="text"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="Enter RFID Device ID"
            required
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading || !selectedInstitution || !deviceId}
            className={`w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-md font-medium text-white transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Assigning...
              </>
            ) : (
              "Assign Device"
            )}
          </button>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`text-center text-sm font-medium mt-2 ${
              feedback.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {feedback.message}
          </div>
        )}
      </form>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import api from "../../api";

// export default function AssignDevice() {
//   const [institutions, setInstitutions] = useState([]);
//   const [selectedInstitution, setSelectedInstitution] = useState("");
//   const [deviceId, setDeviceId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [feedback, setFeedback] = useState(null);

//   useEffect(() => {
//     const fetchInstitutions = async () => {
//       try {
//         const res = await api.get(`/admin/institutions`);
//         setInstitutions(res.data || []);
//       } catch (err) {
//         console.error("Error fetching institutions:", err);
//       }
//     };

//     fetchInstitutions();
//   }, []);

//   const handleAssign = async (e) => {
//     e.preventDefault();
//     if (!selectedInstitution || !deviceId) return;

//     setLoading(true);
//     setFeedback(null);
//     try {
//       const res = await api.post(`/admin/institutions/assign-device`, {
//         institutionCode: selectedInstitution,
//         deviceId,
//       });

//       setFeedback({ type: "success", message: res.data.message });
//       setDeviceId("");
//     } catch (err) {
//       console.error(err);
//       setFeedback({
//         type: "error",
//         message: err?.response?.data?.message || "Something went wrong.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
//       <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-200">
//         <h2 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
//           Assign RFID Device
//         </h2>
//         <form onSubmit={handleAssign} className="space-y-6">
//           {/* Institution Dropdown */}
//           <div>
//             <label
//               htmlFor="institution"
//               className="block text-md font-semibold text-gray-700 mb-2"
//             >
//               🎓 Select Institution
//             </label>
//             <select
//               id="institution"
//               value={selectedInstitution}
//               onChange={(e) => setSelectedInstitution(e.target.value)}
//               className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
//             >
//               <option value="">-- Choose Institution --</option>
//               {institutions.map((inst) => (
//                 <option key={inst._id} value={inst.institutionCode}>
//                   {inst.institutionName} ({inst.institutionCode})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Device ID Input */}
//           <div>
//             <label
//               htmlFor="deviceId"
//               className="block text-md font-semibold text-gray-700 mb-2"
//             >
//               🔒 Device ID
//             </label>
//             <input
//               id="deviceId"
//               type="text"
//               value={deviceId}
//               onChange={(e) => setDeviceId(e.target.value)}
//               placeholder="Enter RFID Device ID"
//               required
//               className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none transition duration-200"
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={loading || !selectedInstitution || !deviceId}
//               className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold text-white transition-all duration-300 shadow-lg ${
//                 loading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-pink-500"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <svg
//                     className="animate-spin h-5 w-5 text-white"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8v8z"
//                     ></path>
//                   </svg>
//                   Assigning...
//                 </>
//               ) : (
//                 "🚀 Assign Device"
//               )}
//             </button>
//           </div>

//           {/* Feedback Message */}
//           {feedback && (
//             <div
//               className={`text-center text-sm font-semibold mt-2 ${
//                 feedback.type === "success"
//                   ? "text-green-600"
//                   : "text-red-500"
//               }`}
//             >
//               {feedback.message}
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }
