// import { useState } from "react";
// import { Pencil, Trash2 } from "lucide-react";

// const fakeStudents = [
//   { id: 1, name: "Aarav Sharma", rollNumber: "STU001", class: "10A", contact: "9876543210" },
//   { id: 2, name: "Priya Patel", rollNumber: "STU002", class: "9B", contact: "9876543211" },
//   { id: 3, name: "Rahul Verma", rollNumber: "STU003", class: "10B", contact: "9876543212" },
//   { id: 4, name: "Sneha Iyer", rollNumber: "STU004", class: "8A", contact: "9876543213" },
//   { id: 5, name: "Karan Joshi", rollNumber: "STU005", class: "9A", contact: "9876543214" },
//   { id: 6, name: "Meera Rao", rollNumber: "STU006", class: "10A", contact: "9876543215" },
//   { id: 7, name: "Nikhil Gupta", rollNumber: "STU007", class: "9B", contact: "9876543216" },
//   { id: 8, name: "Divya Singh", rollNumber: "STU008", class: "8A", contact: "9876543217" },
//   { id: 9, name: "Aditya Reddy", rollNumber: "STU009", class: "10B", contact: "9876543218" },
//   { id: 10, name: "Riya Nair", rollNumber: "STU010", class: "9A", contact: "9876543219" },
// ];

// const Students = () => {
//   const [students, setStudents] = useState(fakeStudents);
//   const [search, setSearch] = useState("");
//   const [selectedClass, setSelectedClass] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentsPerPage, setStudentsPerPage] = useState(5);
//   const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

//   const handleDelete = (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this student?");
//     if (confirmed) {
//       setStudents(students.filter((student) => student.id !== id));
//     }
//   };

//   const groupedStudents = students.reduce((acc, student) => {
//     if (!acc[student.class]) {
//       acc[student.class] = [];
//     }
//     acc[student.class].push(student);
//     return acc;
//   }, {});
//   const sortedClasses = Object.keys(groupedStudents).sort();

//   const filteredStudents = students
//     .filter(
//       (student) =>
//         (selectedClass === "All" || student.class === selectedClass) &&
//         (student.name.toLowerCase().includes(search.toLowerCase()) ||
//           student.rollNumber.toLowerCase().includes(search.toLowerCase()))
//     )
//     .sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
//       if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });

//   const indexOfLast = currentPage * studentsPerPage;
//   const indexOfFirst = indexOfLast - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return "⇅";
//     return sortConfig.direction === "asc" ? "▲" : "▼";
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Students</h1>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or roll number..."
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
//           {sortedClasses.map((className) => (
//             <option key={className} value={className}>
//               {className}
//             </option>
//           ))}
//         </select>
//         <select
//           value={studentsPerPage}
//           onChange={(e) => {
//             setStudentsPerPage(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//           className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           {[5, 10, 15, 20].map((count) => (
//             <option key={count} value={count}>
//               {count} per page
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
//                 onClick={() => handleSort("rollNumber")}
//               >
//                 Roll No {getSortIcon("rollNumber")}
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
//                 onClick={() => handleSort("name")}
//               >
//                 Name {getSortIcon("name")}
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
//                 onClick={() => handleSort("class")}
//               >
//                 Class {getSortIcon("class")}
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
//                 onClick={() => handleSort("contact")}
//               >
//                 Contact {getSortIcon("contact")}
//               </th>
//               <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentStudents.map((student) => (
//               <tr key={student.id} className="hover:bg-gray-50 transition">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.rollNumber}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.class}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{student.contact}</td>
//                 <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-4">
//                   <button className="text-blue-600 hover:text-blue-800">
//                     <Pencil size={18} />
//                   </button>
//                   <button
//                     className="text-red-600 hover:text-red-800"
//                     onClick={() => handleDelete(student.id)}
//                   >
//                     <Trash2 size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {currentStudents.length === 0 && (
//           <p className="text-center text-gray-500 py-4">No students found.</p>
//         )}
//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col md:flex-row md:justify-between items-center mt-6 space-y-4 md:space-y-0">
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
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 border rounded ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {i + 1}
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

// export default Students;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";

// const Students = () => {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedClass, setSelectedClass] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentsPerPage, setStudentsPerPage] = useState(5);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("http://localhost:3000/api/students");
//       const data = await response.json();
//       setStudents(data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePromote = async (id, currentClass) => {
//     try {
//       await fetch(`http://localhost:3000/api/students/${id}/promote`, {
//         method: "PATCH",
//       });
//       fetchStudents();
//     } catch (error) {
//       console.error("Error promoting student:", error);
//     }
//   };

//   const handleDepromote = async (id, currentClass) => {
//     try {
//       await fetch(`http://localhost:3000/api/students/${id}/depromote`, {
//         method: "PATCH",
//       });
//       fetchStudents();
//     } catch (error) {
//       console.error("Error depromoting student:", error);
//     }
//   };

//   const filteredStudents = students.filter(
//     (student) =>
//       (selectedClass === "All" || student.className === selectedClass) &&
//       (student.name.toLowerCase().includes(search.toLowerCase()) ||
//         student.rollNumber.toLowerCase().includes(search.toLowerCase()))
//   );

//   const indexOfLast = currentPage * studentsPerPage;
//   const indexOfFirst = indexOfLast - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Students</h1>

//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or roll number..."
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
//         />
//         <select
//           value={selectedClass}
//           onChange={(e) => {
//             setSelectedClass(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="All">All Classes</option>
//           {[...new Set(students.map((s) => s.className))].map((className) => (
//             <option key={className} value={className}>
//               {className}
//             </option>
//           ))}
//         </select>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-600">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow rounded-lg">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                   Roll No
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                   Class
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentStudents.map((student) => (
//                 <tr key={student._id} className="hover:bg-gray-50 transition">
//                   <td
//                     className="px-6 py-4 cursor-pointer text-sm text-gray-800"
//                     onClick={() => navigate(`/students/${student._id}`)}
//                   >
//                     {student.rollNumber}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {student.name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-800">
//                     {student.className}
//                   </td>
//                   <td className="px-6 py-4 flex space-x-2">
//                     <button
//                       className="text-green-600 hover:text-green-800 flex items-center"
//                       onClick={() =>
//                         handlePromote(student._id, student.className)
//                       }
//                     >
//                       <ArrowUp size={16} className="mr-1" /> Promote
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-800 flex items-center"
//                       onClick={() =>
//                         handleDepromote(student._id, student.className)
//                       }
//                     >
//                       <ArrowDown size={16} className="mr-1" /> Depromote
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {currentStudents.length === 0 && (
//             <p className="text-center text-gray-500 py-4">No students found.</p>
//           )}
//         </div>
//       )}

//       {/* Pagination */}
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
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 border rounded ${
//                 currentPage === i + 1 ? "bg-blue-500 text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
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

// export default Students;