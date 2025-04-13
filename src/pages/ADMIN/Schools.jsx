// import { useState, useEffect } from "react";
// import { Trash2, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
// import api from "../../api";

// const ASchools = () => {
//   const [schools, setSchools] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const schoolsPerPage = 5;

//   const fetchSchools = async () => {
//     try {
//       const response = await api.get("/admin/institutions");
//       setSchools(response.data);
//     } catch (error) {
//       console.error("Error fetching schools:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure to delete this school?");
//     if (!confirmed) return;

//     try {
//       await api.delete(`/admin/institutions/${id}`);
//       fetchSchools();
//     } catch (error) {
//       console.error("Error deleting school:", error);
//     }
//   };

//   const handleActivateSubscription = async (id) => {
//     const confirmed = window.confirm(
//       "Activate subscription for this institution?"
//     );
//     if (!confirmed) return;

//     try {
//       const res = await api.patch(`/admin/institutions/${id}`);
//       alert(res.data.message);
//       fetchSchools();
//     } catch (error) {
//       console.error("Error activating subscription:", error);
//     }
//   };

//   const handleSort = () => {
//     const newOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newOrder);
//     const sorted = [...schools].sort((a, b) => {
//       const nameA = (a.institutionName || "").toLowerCase();
//       const nameB = (b.institutionName || "").toLowerCase();
//       return newOrder === "asc"
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });
//     setSchools(sorted);
//   };

//   const filtered = schools.filter((school) => {
//     const query = search.toLowerCase();
//     return (
//       (school.institutionName || "").toLowerCase().includes(query) ||
//       (school.address || "").toLowerCase().includes(query) ||
//       (school.principalName || "").toLowerCase().includes(query) ||
//       (school.email || "").toLowerCase().includes(query)
//     );
//   });

//   const indexOfLast = currentPage * schoolsPerPage;
//   const indexOfFirst = indexOfLast - schoolsPerPage;
//   const currentSchools = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(Math.ceil(filtered.length / schoolsPerPage), 1);

//   return (
//     <div className="p-6 md:p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">Institutions</h1>

//       <input
//         type="text"
//         placeholder="Search by name, address, principal, or email..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//         className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
//       />

//       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th
//                 className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
//                 onClick={handleSort}
//               >
//                 <div className="flex items-center space-x-1">
//                   <span>Name</span>
//                   {sortOrder === "asc" ? (
//                     <ChevronUp size={16} />
//                   ) : (
//                     <ChevronDown size={16} />
//                   )}
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                 Address
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                 Principal
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
//                 Subscription
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {currentSchools.map((school) => (
//               <tr key={school._id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.institutionName || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.address || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.principalName || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.email || "N/A"}
//                 </td>
//                 <td
//                   className={`text-sm font-semibold py-4 text-center ${
//                     school.subscriptionStatus !== "expired"
//                       ? "text-red-500"
//                       : "text-green-600"
//                   }`}
//                 >
//                   <span>{school.subscriptionStatus || "Inactive"}</span>
//                   <span> - </span>
//                   {school.subscriptionEndDate?.split(",")[0] || "Inactive"}
//                 </td>

//                 {/* <td
//                   className={`text-sm font-semibold py-4 text-center ${
//                     school.subscriptionStatus !== "expired"
//                       ? "text-red-500"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {school.subscriptionEndDate?.split(',')[0] || "Inactive"}
//                 </td> */}

//                 <td className="px-6 py-4">
//                   <div className="flex items-center justify-center space-x-4">
//                     {school.subscriptionStatus?.toLowerCase() === "expired" && (
//                       <>
//                         <button
//                           className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition text-sm font-medium"
//                           onClick={() =>
//                             handleActivateSubscription(school.institutionCode)
//                           }
//                           title="Activate Subscription"
//                         >
//                           <CheckCircle size={18} />
//                           <span>Activate</span>
//                         </button>
//                         <div className="w-[4px] h-5 bg-red-500 rounded-full" />
//                       </>
//                     )}
//                     <button
//                       className="text-red-600 hover:text-red-800 transition"
//                       onClick={() => handleDelete(school._id)}
//                       title="Delete School"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {currentSchools.length === 0 && (
//           <div className="text-center text-gray-500 py-6">
//             No schools found.
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </p>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ASchools;

// import { useState, useEffect } from "react";
// import { Trash2, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
// import api from "../../api";

// const ASchools = () => {
//   const [schools, setSchools] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortOrder, setSortOrder] = useState("asc");
//   const schoolsPerPage = 5;

//   const fetchSchools = async () => {
//     try {
//       const response = await api.get("/admin/institutions");
//       setSchools(response.data);
//     } catch (error) {
//       console.error("Error fetching schools:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSchools();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure to delete this school?");
//     if (!confirmed) return;

//     try {
//       await api.delete(`/admin/institutions/${id}`);
//       fetchSchools();
//     } catch (error) {
//       console.error("Error deleting school:", error);
//     }
//   };

//   const handleActivateSubscription = async (id) => {
//     const confirmed = window.confirm(
//       "Activate subscription for this institution?"
//     );
//     if (!confirmed) return;

//     try {
//       const res = await api.patch(`/admin/institutions/${id}`);
//       alert(res.data.message);
//       fetchSchools();
//     } catch (error) {
//       console.error("Error activating subscription:", error);
//     }
//   };

//   const handleSort = () => {
//     const newOrder = sortOrder === "asc" ? "desc" : "asc";
//     setSortOrder(newOrder);
//     const sorted = [...schools].sort((a, b) => {
//       const nameA = (a.institutionName || "").toLowerCase();
//       const nameB = (b.institutionName || "").toLowerCase();
//       return newOrder === "asc"
//         ? nameA.localeCompare(nameB)
//         : nameB.localeCompare(nameA);
//     });
//     setSchools(sorted);
//   };

//   const filtered = schools.filter((school) => {
//     const query = search.toLowerCase();
//     return (
//       (school.institutionName || "").toLowerCase().includes(query) ||
//       (school.address || "").toLowerCase().includes(query) ||
//       (school.principalName || "").toLowerCase().includes(query) ||
//       (school.email || "").toLowerCase().includes(query)
//     );
//   });

//   const indexOfLast = currentPage * schoolsPerPage;
//   const indexOfFirst = indexOfLast - schoolsPerPage;
//   const currentSchools = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.max(Math.ceil(filtered.length / schoolsPerPage), 1);

//   return (
//     <div className="p-6 md:p-8 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-6 text-[tomato] font-mono tracking-wide">Institutions</h1>

//       <input
//         type="text"
//         placeholder="Search by name, address, principal, or email..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//         className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
//       />

//       <div className="overflow-x-auto bg-white rounded-xl shadow-md">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th
//                 className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
//                 onClick={handleSort}
//               >
//                 <div className="flex items-center space-x-1">
//                   <span>Name</span>
//                   {sortOrder === "asc" ? (
//                     <ChevronUp size={16} />
//                   ) : (
//                     <ChevronDown size={16} />
//                   )}
//                 </div>
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                 Address
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                 Principal
//               </th>
//               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
//                 Subscription
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100">
//             {currentSchools.map((school) => (
//               <tr key={school._id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.institutionName || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.address || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.principalName || "N/A"}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
//                   {school.email || "N/A"}
//                 </td>
//                 <td
//                   className={`text-sm font-semibold py-4 text-center ${
//                     school.subscriptionStatus?.toLowerCase() === "expired"
//                       ? "text-red-500"
//                       : "text-green-600"
//                   }`}
//                 >
//                   <span>{school.subscriptionStatus || "Inactive"}</span>
//                   {school.subscriptionStatus?.toLowerCase() !== "expired" &&
//                     school.subscriptionEndDate && (
//                       <span> - {school.subscriptionEndDate.split(",")[0]}</span>
//                     )}
//                 </td>

//                 <td className="px-6 py-4">
//                   <div className="flex items-center justify-center space-x-4">
//                     {school.subscriptionStatus?.toLowerCase() === "expired" && (
//                       <>
//                         <button
//                           className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition text-sm font-medium"
//                           onClick={() =>
//                             handleActivateSubscription(school.institutionCode)
//                           }
//                           title="Activate Subscription"
//                         >
//                           <CheckCircle size={18} />
//                           <span>Activate</span>
//                         </button>
//                         <div className="w-[4px] h-5 bg-red-500 rounded-full" />
//                       </>
//                     )}
//                     <button
//                       className="text-red-600 hover:text-red-800 transition"
//                       onClick={() => handleDelete(school._id)}
//                       title="Delete School"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {currentSchools.length === 0 && (
//           <div className="text-center text-gray-500 py-6">
//             No schools found.
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </p>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ASchools;

import { useState, useEffect } from "react";
import { Trash2, CheckCircle, ChevronUp, ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom
import api from "../../api";

const ASchools = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const schoolsPerPage = 5;

  const fetchSchools = async () => {
    try {
      const response = await api.get("/admin/institutions");
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure to delete this school?");
    if (!confirmed) return;

    try {
      await api.delete(`/admin/institutions/${id}`);
      fetchSchools();
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  const handleActivateSubscription = async (id) => {
    const confirmed = window.confirm(
      "Activate subscription for this institution?"
    );
    if (!confirmed) return;

    try {
      const res = await api.patch(`/admin/institutions/${id}`);
      alert(res.data.message);
      fetchSchools();
    } catch (error) {
      console.error("Error activating subscription:", error);
    }
  };

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sorted = [...schools].sort((a, b) => {
      const nameA = (a.institutionName || "").toLowerCase();
      const nameB = (b.institutionName || "").toLowerCase();
      return newOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setSchools(sorted);
  };

  const filtered = schools.filter((school) => {
    const query = search.toLowerCase();
    return (
      (school.institutionName || "").toLowerCase().includes(query) ||
      (school.address || "").toLowerCase().includes(query) ||
      (school.principalName || "").toLowerCase().includes(query) ||
      (school.email || "").toLowerCase().includes(query)
    );
  });

  const indexOfLast = currentPage * schoolsPerPage;
  const indexOfFirst = indexOfLast - schoolsPerPage;
  const currentSchools = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(Math.ceil(filtered.length / schoolsPerPage), 1);

  return (
    <div className="p-6 md:p-8 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-[tomato] font-mono tracking-wide">
        Institutions
      </h1>

      <input
        type="text"
        placeholder="Search by name, address, principal, or email..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
      />

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                onClick={handleSort}
              >
                <div className="flex items-center space-x-1">
                  <span>Name</span>
                  {sortOrder === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Address
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Principal
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                Subscription
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentSchools.map((school) => (
              <tr key={school._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  <NavLink
                    to={`${school.institutionName}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {school.institutionName || "N/A"}
                  </NavLink>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {school.address || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {school.principalName || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {school.email || "N/A"}
                </td>
                <td
                  className={`text-sm font-semibold py-4 text-center ${
                    school.subscriptionStatus?.toLowerCase() === "expired"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  <span>{school.subscriptionStatus || "Inactive"}</span>
                  {school.subscriptionStatus?.toLowerCase() !== "expired" &&
                    school.subscriptionEndDate && (
                      <span> - {school.subscriptionEndDate.split(",")[0]}</span>
                    )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-4">
                    {school.subscriptionStatus?.toLowerCase() === "expired" && (
                      <>
                        <button
                          className="flex items-center space-x-1 text-green-600 hover:text-green-800 transition text-sm font-medium"
                          onClick={() =>
                            handleActivateSubscription(school.institutionCode)
                          }
                          title="Activate Subscription"
                        >
                          <CheckCircle size={18} />
                          <span>Activate</span>
                        </button>
                        <div className="w-[4px] h-5 bg-red-500 rounded-full" />
                      </>
                    )}
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(school._id)}
                      title="Delete School"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {currentSchools.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No schools found.
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-3 sm:space-y-0">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-1.5 rounded-lg border border-gray-300 text-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ASchools;
