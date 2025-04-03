// import { useState } from "react";

// const initialFormState = {
//   name: "",
//   address: "",
//   principal: "",
//   email: "",
//   contact: "",
// };

// const fieldLabels = {
//   name: "Institution Name",
//   address: "Institution Address",
//   principal: "Head of Institution",
//   email: "Official Email",
//   contact: "Contact Number",
// };

// const InstitutionRequestForm = ({id}) => {
//   const [formData, setFormData] = useState(initialFormState);
//   const [statusMessage, setStatusMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setStatusMessage("");

//     try {
//       const response = await fetch("http://localhost:3000/api/institution-request", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setStatusMessage(`✅ ${data.message || "Request submitted successfully."}`);
//         setFormData(initialFormState);
//       } else {
//         setStatusMessage(`❌ ${data.message || "Failed to submit request."}`);
//       }
//     } catch (error) {
//       setStatusMessage("❌ An error occurred. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section id={id} className="min-h-screen flex items-center justify-center mt-6 bg-gradient-to-br from-white to-gray-100 px-2">
//       <div className="w-full max-w-xl bg-white border border-gray-200 shadow-lg rounded-lg p-10">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
//           Institution Service Request
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {Object.keys(formData).map((field) => (
//             <div key={field} className="flex flex-col">
//               <label
//                 htmlFor={field}
//                 className="text-gray-700 font-medium mb-2"
//               >
//                 {fieldLabels[field]}
//               </label>
//               <input
//                 id={field}
//                 name={field}
//                 type={field === "email" ? "email" : "text"}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 placeholder={`Enter ${fieldLabels[field]}`}
//                 required
//                 className="px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 transition-all duration-300"
//               />
//             </div>
//           ))}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 font-medium rounded-md shadow-sm transition-colors duration-300 ${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-600 text-white hover:bg-blue-700"
//             }`}
//           >
//             {loading ? "Submitting..." : "Submit Request"}
//           </button>

//           {statusMessage && (
//             <p
//               className={`text-center font-medium mt-4 ${
//                 statusMessage.includes("✅") ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {statusMessage}
//             </p>
//           )}
//         </form>
//       </div>
//     </section>
//   );
// };

// export default InstitutionRequestForm;

import { useState } from "react";

const initialFormState = {
  name: "",
  address: "",
  principal: "",
  email: "",
  contact: "",
};

const fieldLabels = {
  name: "Institution Name",
  address: "Institution Address",
  principal: "Head of Institution",
  email: "Official Email",
  contact: "Contact Number",
};

const InstitutionRequestForm = ({ id }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/institution-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(
          `✅ ${data.message || "Request submitted successfully."}`
        );
        setFormData(initialFormState);
      } else {
        setStatusMessage(`❌ ${data.message || "Failed to submit request."}`);
      }
    } catch (error) {
      setStatusMessage("❌ An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-10"
    >
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Institution Service Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col">
              <label
                htmlFor={field}
                className="text-gray-700 font-semibold mb-2"
              >
                {fieldLabels[field]}
              </label>
              <input
                id={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${fieldLabels[field]}`}
                required
                className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-800 shadow-sm transition-all duration-300"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg shadow-md transition-all duration-300 flex justify-center items-center gap-2 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
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
                  d="M4 12a8 8 0 0116 0H4z"
                ></path>
              </svg>
            )}
            {loading ? "Submitting..." : "Submit Request"}
          </button>

          {statusMessage && (
            <p
              className={`text-center font-medium mt-4 ${
                statusMessage.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default InstitutionRequestForm;
