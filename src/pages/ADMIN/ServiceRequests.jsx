// import { useState } from "react";
// import { Check, Trash2 } from "lucide-react";

// const fakeRequests = [
//   { id: 1, school: "Green Valley High", date: "2025-03-01", status: "Pending" },
//   { id: 2, school: "Sunshine Public", date: "2025-03-10", status: "Pending" },
//   { id: 3, school: "Blue Bells Academy", date: "2025-03-15", status: "Approved" },
// ];

// const ServiceRequests = () => {
//   const [requests, setRequests] = useState(
//     fakeRequests.filter((r) => r.status === "Pending")
//   );
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const requestsPerPage = 5;

//   const filtered = requests.filter((r) =>
//     r.school.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLast = currentPage * requestsPerPage;
//   const indexOfFirst = indexOfLast - requestsPerPage;
//   const currentRequests = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / requestsPerPage);

//   const handleApprove = (id) => {
//     const confirmed = window.confirm("Approve this service request?");
//     if (confirmed) {
//       setRequests((prev) => prev.filter((r) => r.id !== id));
//     }
//   };

//   const handleDelete = (id) => {
//     const confirmed = window.confirm("Delete this service request?");
//     if (confirmed) {
//       setRequests((prev) => prev.filter((r) => r.id !== id));
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Service Requests</h1>

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
//               <th className="px-6 py-3 text-left text-sm text-gray-700">School</th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">Date</th>
//               <th className="px-6 py-3 text-center text-sm text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentRequests.map((r) => (
//               <tr key={r.id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 text-sm text-gray-800">{r.school}</td>
//                 <td className="px-6 py-4 text-sm text-gray-800">{r.date}</td>
//                 <td className="px-6 py-4 flex justify-center space-x-4">
//                   <button
//                     className="text-green-600 hover:text-green-800"
//                     onClick={() => handleApprove(r.id)}
//                   >
//                     <Check size={18} />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDelete(r.id)}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {currentRequests.length === 0 && (
//           <p className="text-center text-gray-500 py-4">No pending service requests.</p>
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
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

// export default ServiceRequests;



import { useState, useEffect } from "react";
import { Check, Trash2 } from "lucide-react";

const ServiceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const requestsPerPage = 5;

  // Fetch service requests from the backend
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/servicerequests");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const approveRequest = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/servicerequests/${id}/approve`, {
        method: "PUT",
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Approved: School ID: ${data.schoolCode}, Password: ${data.password}`);
        fetchRequests(); // Refresh data
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const deleteRequest = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      const response = await fetch(`http://localhost:3000/api/servicerequests/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchRequests(); // Refresh data
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const filtered = requests.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
  const indexOfLast = currentPage * requestsPerPage;
  const indexOfFirst = indexOfLast - requestsPerPage;
  const currentRequests = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / requestsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Service Requests</h1>
      
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
              <th className="px-6 py-3 text-left text-sm text-gray-700">School</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRequests.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{r.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{new Date(r.createdAt).toLocaleDateString()}</td>
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
                    className="px-3 py-1 text-white bg-red-500 rounded flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentRequests.length === 0 && (
          <p className="text-center text-gray-500 py-4">No pending service requests.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">Page {currentPage} of {totalPages || 1}</p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

export default ServiceRequests;