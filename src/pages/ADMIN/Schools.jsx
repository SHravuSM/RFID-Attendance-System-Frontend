// import { useState, useEffect } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../../api";

// const ASchools = () => {
//   const [schools, setSchools] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const schoolsPerPage = 5;

//   // Fetch schools
//   useEffect(() => {
//     const fetchSchools = async () => {
//       try {
//         const response = await api.get("/admin/institutions"); // Base URL is already set
//         console.log("Fetched schools:", response.data);
//         setSchools(response.data);
//       } catch (error) {
//         console.error("Error fetching schools:", error);
//       }
//     };
//     fetchSchools();
//   }, []);

//   // Delete a school
//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure to delete this school?");
//     if (!confirmed) return;

//     try {
//       await api.delete(`/admin/institutions/${id}`);
//       setSchools((prev) => prev.filter((school) => school._id !== id));
//     } catch (error) {
//       console.error("Error deleting school:", error);
//     }
//   };

//   // Search & Pagination
//   const filtered = schools.filter((school) =>
//     school.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLast = currentPage * schoolsPerPage;
//   const indexOfFirst = indexOfLast - schoolsPerPage;
//   const currentSchools = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / schoolsPerPage);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Schools</h1>

//       <input
//         type="text"
//         placeholder="Search by name..."
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
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Address
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Principal
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Email
//               </th>
//               <th className="px-6 py-3 text-center text-sm text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentSchools.map((school) => (
//               <tr key={school._id} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                   {school.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                   {school.address}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                   {school.principal}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                   {school.email}
//                 </td>
//                 <td className="px-6 py-4 flex justify-center space-x-4">
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDelete(school._id)}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {currentSchools.length === 0 && (
//           <p className="text-center text-gray-500 py-4">No schools found.</p>
//         )}
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
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
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50"
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
import { Trash2 } from "lucide-react";
import api from "../../api";

const ASchools = () => {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const schoolsPerPage = 5;

  // Fetch schools
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await api.get("/admin/institutions"); // Base URL is already set
        console.log("Fetched schools:", response.data);
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };
    fetchSchools();
  }, []);

  // Delete a school
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure to delete this school?");
    if (!confirmed) return;

    try {
      await api.delete(`/admin/institutions/${id}`);
      setSchools((prev) => prev.filter((school) => school._id !== id));
    } catch (error) {
      console.error("Error deleting school:", error);
    }
  };

  // Search & Pagination (with fix)
  const filtered = schools.filter((school) =>
    (school.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * schoolsPerPage;
  const indexOfFirst = indexOfLast - schoolsPerPage;
  const currentSchools = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(Math.ceil(filtered.length / schoolsPerPage), 1);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Schools</h1>

      <input
        type="text"
        placeholder="Search by name..."
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
              <th className="px-6 py-3 text-left text-sm text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Address</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Principal</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Email</th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentSchools.map((school) => (
              <tr key={school._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {school.institutionName || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {school.address || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {school.principalName || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {school.email || "N/A"}
                </td>
                <td className="px-6 py-4 flex justify-center space-x-4">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(school._id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {currentSchools.length === 0 && (
          <p className="text-center text-gray-500 py-4">No schools found.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
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
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ASchools;