// import { useState, useEffect } from "react";
// import { Check, Trash2 } from "lucide-react";
// import api from "../../api";

// const AServiceRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const requestsPerPage = 5;

//   // Fetch service requests from the backend
//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const response = await api.get(
//         `${import.meta.env.VITE_API_URL}/admin/servicerequests`
//       );
//       setRequests(response.data); // axios uses response.data
//     } catch (error) {
//       console.error("Error fetching service requests:", error);
//     }
//   };

//   const approveRequest = async (id) => {
//     try {
//       const response = await api.put(
//         `${import.meta.env.VITE_API_URL}/admin/servicerequests/${id}/approve`
//       );
//       const data = response.data;
//       alert(
//         `Approved: School ID: ${data.institutionCode}, Password: ${data.password}`
//       );
//       fetchRequests(); // Refresh data
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Error approving request.";
//       alert(message);
//       console.error("Error approving request:", error);
//     }
//   };

//   const deleteRequest = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this request?"))
//       return;
//     try {
//       const response = await api.delete(
//         `${import.meta.env.VITE_API_URL}/admin/servicerequests/${id}`
//       );
//       alert(response.data.message);
//       fetchRequests(); // Refresh data
//     } catch (error) {
//       const message =
//         error.response?.data?.message || "Error deleting request.";
//       alert(message);
//       console.error("Error deleting request:", error);
//     }
//   };

//   const filtered = requests.filter((r) =>
//     r.institutionName?.toLowerCase().includes(search?.toLowerCase() || "")
//   );

//   requests.forEach((r, i) => {
//     if (!r.institutionName)
//       console.warn(`Missing 'institutionName' at index ${i}`, r);
//   });

//   const indexOfLast = currentPage * requestsPerPage;
//   const indexOfFirst = indexOfLast - requestsPerPage;
//   const currentRequests = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / requestsPerPage);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">
//         Service Requests
//       </h1>

//       <input
//         type="text"
//         placeholder="Search by school name..."
//         value={search}
//         onChange={(e) => {
//           setSearch(e.target.value);
//           setCurrentPage(1);
//         }}
//         className="w-full md:w-1/3 px-4 py-2 border rounded mb-4"
//       />

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 School
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentRequests.map((r) => (
//               <tr key={r._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm text-gray-800">
//                   {r.institutionName}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800">
//                   {new Date(r.createdAt).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 text-sm text-gray-800 flex space-x-2">
//                   {!r.approved && (
//                     <button
//                       onClick={() => approveRequest(r._id)}
//                       className="px-3 py-1 text-white bg-green-500 rounded flex items-center"
//                     >
//                       <Check size={16} className="mr-1" /> Approve
//                     </button>
//                   )}
//                   <button
//                     onClick={() => deleteRequest(r._id)}
//                     className="px-3 py-1 text-white bg-red-500 rounded flex items-center"
//                   >
//                     <Trash2 size={16} className="mr-1" /> Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {currentRequests.length === 0 && (
//           <p className="text-center text-gray-500 py-4">
//             No pending service requests.
//           </p>
//         )}
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages || 1}
//         </p>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AServiceRequests;

import { useState, useEffect } from "react";
import { Check, Trash2 } from "lucide-react";
import api from "../../api";

const AServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/admin/servicerequests");
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const approveRequest = async (id) => {
    try {
      const response = await api.put(`/admin/servicerequests/${id}/approve`);
      const data = response.data;
      alert(
        `Approved: School ID: ${data.institutionCode}, Password: ${data.password}`
      );
      fetchRequests();
    } catch (error) {
      const message =
        error.response?.data?.message || "Error approving request.";
      alert(message);
      console.error("Error approving request:", error);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      const response = await api.delete(`/admin/servicerequests/${id}`);
      alert(response.data.message);
      fetchRequests();
    } catch (error) {
      const message =
        error.response?.data?.message || "Error deleting request.";
      alert(message);
      console.error("Error deleting request:", error);
    }
  };

  const filtered = requests.filter((r) =>
    r.institutionName?.toLowerCase().includes(search?.toLowerCase() || "")
  );

  requests.forEach((r, i) => {
    if (!r.institutionName)
      console.warn(`Missing 'institutionName' at index ${i}`, r);
  });

  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / requestsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Service Requests
      </h1>

      <input
        type="text"
        placeholder="Search by school name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="w-full md:w-1/3 px-4 py-2 border rounded mb-4"
      />

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                Institution
              </th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                Date
              </th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                Principal
              </th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                email
              </th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                Actions
              </th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                Contact
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {r.institutionName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {r.principalName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">{r.email}</td>
                <td className="px-6 py-4 text-sm text-gray-800 flex space-x-2">
                  {!r.approved && (
                    <button
                      onClick={() => approveRequest(r._id)}
                      className="px-3 py-1 text-white bg-green-500 rounded flex items-center"
                    >
                      <Check size={16} className="mr-1" /> Approve
                    </button>
                  )}
                  <button
                    onClick={() => deleteRequest(r._id)}
                    className="pl-2 pr-1 text-white bg-red-500 rounded flex items-center"
                  >
                    <Trash2 size={18} className="mr-1" />
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {r.contactNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentRequests.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            No pending service requests.
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AServiceRequests;
