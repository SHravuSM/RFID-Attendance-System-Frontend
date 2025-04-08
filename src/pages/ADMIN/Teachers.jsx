// import { useState, useEffect } from "react";
// import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

// const ATeachers = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedClass, setSelectedClass] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [teachersPerPage, setTeachersPerPage] = useState(5); // Dynamic Count
//   const [loading, setLoading] = useState(true); // Loading state

//   // Fetch Teachers from Backend
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teachers`);
//         const data = await response.json();
//         setTeachers(data);
//       } catch (error) {
//         console.error("Error fetching teachers:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   // Sorting logic
//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedTeachers = [...teachers].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const valA = a[sortConfig.key]?.toString().toLowerCase();
//     const valB = b[sortConfig.key]?.toString().toLowerCase();
//     if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//     if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   // Filtering logic
//   const filteredTeachers = sortedTeachers.filter(
//     (teacher) =>
//       (selectedClass === "All" || teacher.className === selectedClass) &&
//       (teacher.name.toLowerCase().includes(search.toLowerCase()) ||
//         teacher.teacherId.toLowerCase().includes(search.toLowerCase()))
//   );

//   // Pagination logic
//   const indexOfLastTeacher = currentPage * teachersPerPage;
//   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
//   const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
//   const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

//   const groupedClasses = [...new Set(teachers.map((t) => t.className))].sort();

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Teachers</h1>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or ID..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={selectedClass}
//           onChange={(e) => {
//             setSelectedClass(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="All">All Classes</option>
//           {groupedClasses.map((cls) => (
//             <option key={cls} value={cls}>
//               {cls}
//             </option>
//           ))}
//         </select>
//         <select
//           value={teachersPerPage}
//           onChange={(e) => {
//             setTeachersPerPage(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//           className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {[5, 10, 15, 20].map((count) => (
//             <option key={count} value={count}>
//               Show {count}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <p className="text-center text-gray-500 py-4">Loading teachers...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["teacherId", "name", "className", "contact"].map((key) => (
//                   <th
//                     key={key}
//                     className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600"
//                     onClick={() => handleSort(key)}
//                   >
//                     <div className="flex items-center gap-1">
//                       {key === "teacherId" && "Teacher ID"}
//                       {key === "name" && "Name"}
//                       {key === "className" && "Class"}
//                       {key === "contact" && "Contact"}
//                       <ArrowUpDown size={14} />
//                     </div>
//                   </th>
//                 ))}
//                 <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentTeachers.map((teacher) => (
//                 <tr key={teacher._id} className="hover:bg-gray-50 transition">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.teacherId}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.className}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.contact}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ATeachers;





import { useState, useEffect } from "react";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import api from "../../api"; // 🔁 Update this path based on your project structure

const ATeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [teachersPerPage, setTeachersPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  // Fetch Teachers from Backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/teachers");
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Sorting logic
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTeachers = [...teachers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase();
    const valB = b[sortConfig.key]?.toString().toLowerCase();
    if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
    if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filtering logic
  const filteredTeachers = sortedTeachers.filter(
    (teacher) =>
      (selectedClass === "All" || teacher.className === selectedClass) &&
      (teacher.name.toLowerCase().includes(search.toLowerCase()) ||
        teacher.teacherId.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

  const groupedClasses = [...new Set(teachers.map((t) => t.className))].sort();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Teachers</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Classes</option>
          {groupedClasses.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        <select
          value={teachersPerPage}
          onChange={(e) => {
            setTeachersPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {[5, 10, 15, 20].map((count) => (
            <option key={count} value={count}>
              Show {count}
            </option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500 py-4">Loading teachers...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["teacherId", "name", "className", "contact"].map((key) => (
                  <th
                    key={key}
                    className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600"
                    onClick={() => handleSort(key)}
                  >
                    <div className="flex items-center gap-1">
                      {key === "teacherId" && "Teacher ID"}
                      {key === "name" && "Name"}
                      {key === "className" && "Class"}
                      {key === "contact" && "Contact"}
                      <ArrowUpDown size={14} />
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTeachers.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.teacherId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.className}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-800">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Pencil size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ATeachers;