// // import { useState } from "react";
// // import { Pencil, Trash2 } from "lucide-react";

// // const fakeTeachers = [
// //   { id: 1, name: "Mr. Arjun Reddy", teacherId: "TEA001", class: "10A", contact: "9876501110" },
// //   { id: 2, name: "Mrs. Priya Nair", teacherId: "TEA002", class: "9B", contact: "9876501111" },
// //   { id: 3, name: "Mr. Ravi Kumar", teacherId: "TEA003", class: "10B", contact: "9876501112" },
// //   { id: 4, name: "Ms. Sneha Iyer", teacherId: "TEA004", class: "8A", contact: "9876501113" },
// //   { id: 5, name: "Mr. Karan Joshi", teacherId: "TEA005", class: "9A", contact: "9876501114" },
// //   { id: 6, name: "Mrs. Meera Rao", teacherId: "TEA006", class: "10A", contact: "9876501115" },
// //   { id: 7, name: "Mr. Nikhil Gupta", teacherId: "TEA007", class: "9B", contact: "9876501116" },
// //   { id: 8, name: "Mrs. Divya Singh", teacherId: "TEA008", class: "8A", contact: "9876501117" },
// //   { id: 9, name: "Mr. Aditya Reddy", teacherId: "TEA009", class: "10B", contact: "9876501118" },
// //   { id: 10, name: "Ms. Riya Nair", teacherId: "TEA010", class: "9A", contact: "9876501119" },
// //   { id: 11, name: "Mr. Vikram Das", teacherId: "TEA011", class: "8A", contact: "9876501120" },
// //   { id: 12, name: "Mrs. Neha Kapoor", teacherId: "TEA012", class: "10A", contact: "9876501121" },
// //   { id: 13, name: "Mr. Arjun Mehta", teacherId: "TEA013", class: "9B", contact: "9876501122" },
// //   { id: 14, name: "Ms. Pooja Rathi", teacherId: "TEA014", class: "10B", contact: "9876501123" },
// //   { id: 15, name: "Mr. Sahil Khan", teacherId: "TEA015", class: "8A", contact: "9876501124" },
// // ];

// // const Teachers = () => {
// //   const [teachers, setTeachers] = useState(fakeTeachers);
// //   const [search, setSearch] = useState("");
// //   const [selectedClass, setSelectedClass] = useState("All");
// //   const [currentPage, setCurrentPage] = useState(1);

// //   const teachersPerPage = 5;

// //   const handleDelete = (id) => {
// //     const confirmed = window.confirm("Are you sure you want to delete this teacher?");
// //     if (confirmed) {
// //       setTeachers(teachers.filter((teacher) => teacher.id !== id));
// //     }
// //   };

// //   // Group teachers by class
// //   const groupedTeachers = teachers.reduce((acc, teacher) => {
// //     if (!acc[teacher.class]) {
// //       acc[teacher.class] = [];
// //     }
// //     acc[teacher.class].push(teacher);
// //     return acc;
// //   }, {});

// //   const sortedClasses = Object.keys(groupedTeachers).sort();

// //   // Filtered Teachers
// //   const filteredTeachers = teachers.filter(
// //     (teacher) =>
// //       (selectedClass === "All" || teacher.class === selectedClass) &&
// //       (teacher.name.toLowerCase().includes(search.toLowerCase()) ||
// //         teacher.teacherId.toLowerCase().includes(search.toLowerCase()))
// //   );

// //   // Pagination Logic
// //   const indexOfLastTeacher = currentPage * teachersPerPage;
// //   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
// //   const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
// //   const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

// //   return (
// //     <div className="p-8">
// //       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Teachers</h1>

// //       {/* Filters */}
// //       <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
// //         <input
// //           type="text"
// //           placeholder="Search by name or ID..."
// //           value={search}
// //           onChange={(e) => {
// //             setSearch(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //           className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <select
// //           value={selectedClass}
// //           onChange={(e) => {
// //             setSelectedClass(e.target.value);
// //             setCurrentPage(1);
// //           }}
// //           className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         >
// //           <option value="All">All Classes</option>
// //           {sortedClasses.map((className) => (
// //             <option key={className} value={className}>
// //               {className}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Teacher Table */}
// //       <div className="overflow-x-auto bg-white shadow rounded-lg">
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-50">
// //             <tr>
// //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Teacher ID</th>
// //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
// //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Class</th>
// //               <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Contact</th>
// //               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-200">
// //             {currentTeachers.map((teacher) => (
// //               <tr key={teacher.id} className="hover:bg-gray-50 transition">
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.teacherId}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.name}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.class}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.contact}</td>
// //                 <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-4">
// //                   <button className="text-blue-600 hover:text-blue-800">
// //                     <Pencil size={18} />
// //                   </button>
// //                   <button
// //                     className="text-red-600 hover:text-red-800"
// //                     onClick={() => handleDelete(teacher.id)}
// //                   >
// //                     <Trash2 size={18} />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         {/* Empty State */}
// //         {currentTeachers.length === 0 && (
// //           <p className="text-center text-gray-500 py-4">No teachers found.</p>
// //         )}
// //       </div>

// //       {/* Pagination */}
// //       <div className="flex justify-center mt-6 space-x-2">
// //         <button
// //           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //           disabled={currentPage === 1}
// //           className="px-3 py-1 border rounded disabled:opacity-50"
// //         >
// //           Prev
// //         </button>
// //         {Array.from({ length: totalPages }).map((_, index) => (
// //           <button
// //             key={index}
// //             onClick={() => setCurrentPage(index + 1)}
// //             className={`px-3 py-1 border rounded ${
// //               currentPage === index + 1 ? "bg-blue-500 text-white" : ""
// //             }`}
// //           >
// //             {index + 1}
// //           </button>
// //         ))}
// //         <button
// //           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
// //           disabled={currentPage === totalPages}
// //           className="px-3 py-1 border rounded disabled:opacity-50"
// //         >
// //           Next
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Teachers;


// import { useState } from "react";
// import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

// const fakeTeachers = [
//   { id: 1, name: "Mr. Arjun Reddy", teacherId: "TEA001", class: "10A", contact: "9876501110" },
//   { id: 2, name: "Mrs. Priya Nair", teacherId: "TEA002", class: "9B", contact: "9876501111" },
//   { id: 3, name: "Mr. Ravi Kumar", teacherId: "TEA003", class: "10B", contact: "9876501112" },
//   { id: 4, name: "Ms. Sneha Iyer", teacherId: "TEA004", class: "8A", contact: "9876501113" },
//   { id: 5, name: "Mr. Karan Joshi", teacherId: "TEA005", class: "9A", contact: "9876501114" },
//   { id: 6, name: "Mrs. Meera Rao", teacherId: "TEA006", class: "10A", contact: "9876501115" },
//   { id: 7, name: "Mr. Nikhil Gupta", teacherId: "TEA007", class: "9B", contact: "9876501116" },
//   { id: 8, name: "Mrs. Divya Singh", teacherId: "TEA008", class: "8A", contact: "9876501117" },
//   { id: 9, name: "Mr. Aditya Reddy", teacherId: "TEA009", class: "10B", contact: "9876501118" },
//   { id: 10, name: "Ms. Riya Nair", teacherId: "TEA010", class: "9A", contact: "9876501119" },
//   { id: 11, name: "Mr. Vikram Das", teacherId: "TEA011", class: "8A", contact: "9876501120" },
//   { id: 12, name: "Mrs. Neha Kapoor", teacherId: "TEA012", class: "10A", contact: "9876501121" },
//   { id: 13, name: "Mr. Arjun Mehta", teacherId: "TEA013", class: "9B", contact: "9876501122" },
//   { id: 14, name: "Ms. Pooja Rathi", teacherId: "TEA014", class: "10B", contact: "9876501123" },
//   { id: 15, name: "Mr. Sahil Khan", teacherId: "TEA015", class: "8A", contact: "9876501124" },
// ];

// const Teachers = () => {
//   const [teachers, setTeachers] = useState(fakeTeachers);
//   const [search, setSearch] = useState("");
//   const [selectedClass, setSelectedClass] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [teachersPerPage, setTeachersPerPage] = useState(5); // Dynamic Count

//   const handleDelete = (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this teacher?");
//     if (confirmed) {
//       setTeachers(teachers.filter((teacher) => teacher.id !== id));
//     }
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedTeachers = [...teachers].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const valA = a[sortConfig.key].toLowerCase();
//     const valB = b[sortConfig.key].toLowerCase();
//     if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
//     if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
//     return 0;
//   });

//   const filteredTeachers = sortedTeachers.filter(
//     (teacher) =>
//       (selectedClass === "All" || teacher.class === selectedClass) &&
//       (teacher.name.toLowerCase().includes(search.toLowerCase()) ||
//         teacher.teacherId.toLowerCase().includes(search.toLowerCase()))
//   );

//   const indexOfLastTeacher = currentPage * teachersPerPage;
//   const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
//   const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);
//   const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

//   const groupedClasses = [...new Set(teachers.map((t) => t.class))].sort();

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

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {["teacherId", "name", "class", "contact"].map((key) => (
//                 <th
//                   key={key}
//                   className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600"
//                   onClick={() => handleSort(key)}
//                 >
//                   <div className="flex items-center gap-1">
//                     {key === "teacherId" && "Teacher ID"}
//                     {key === "name" && "Name"}
//                     {key === "class" && "Class"}
//                     {key === "contact" && "Contact"}
//                     <ArrowUpDown size={14} />
//                   </div>
//                 </th>
//               ))}
//               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentTeachers.map((teacher) => (
//               <tr key={teacher.id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.teacherId}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.class}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{teacher.contact}</td>
//                 <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-4">
//                   <button className="text-blue-600 hover:text-blue-800">
//                     <Pencil size={18} />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDelete(teacher.id)}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Empty State */}
//         {currentTeachers.length === 0 && (
//           <p className="text-center text-gray-500 py-4">No teachers found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 space-y-4 md:space-y-0">
//         <div className="text-sm text-gray-600">
//           Showing {indexOfFirstTeacher + 1} -{" "}
//           {indexOfLastTeacher > filteredTeachers.length
//             ? filteredTeachers.length
//             : indexOfLastTeacher}{" "}
//           of {filteredTeachers.length}
//         </div>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentPage(index + 1)}
//               className={`px-3 py-1 border rounded ${
//                 currentPage === index + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

// export default Teachers;


import { useState, useEffect } from "react";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [teachersPerPage, setTeachersPerPage] = useState(5); // Dynamic Count
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch Teachers from Backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/api/teachers");
        const data = await response.json();
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teachers;