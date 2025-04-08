// import React, { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../../api";

// const IClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [className, setClassName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [addLoading, setAddLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch classes on mount
//   const fetchClasses = async () => {
//     try {
//       const res = await api.get("/institution/classes");
//       const classes = res.data.classes;
//       const students = res.data.students;
//       console.log(classes);
//       setClasses(classes);
//       setStudents(students);
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setError("Failed to fetch classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleChange = (e) => {
//     setClassName(e.target.value);
//   };

//   const handleAddClass = async (e) => {
//     e.preventDefault();
//     if (className.length == 0) return;
//     if (!className.trim()) return alert("Please fill out the field.");
//     setAddLoading(true);
//     try {
//       const res = await api.post("/institution/classes/add", { className });
//       setClasses(res.data.classes); // safer
//       setClassName("");
//       alert("Class added successfully");
//     } catch (err) {
//       console.error("Error adding class:", err);
//       alert("Failed to add class");
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleDeleteClass = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this class?"
//     );
//     if (!confirmed) return;
//     try {
//       const res = await api.delete(`/institution/classes/delete/${id}`);
//       setClasses((prev) => prev.filter((cls) => cls._id !== id));
//       await fetchClasses();
//     } catch (err) {
//       console.error("Error deleting class:", err);
//       // alert("Failed to delete class");
//       alert(err?.response?.data?.message || "Something went wrong");
//     }
//   };

//   if (loading)
//     return <div className="p-4 text-blue-500">Loading classes...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Classes</h2>

//       {/* Add Class Form */}
//       <form
//         onSubmit={handleAddClass}
//         className="mb-8 bg-white p-4 rounded-lg shadow space-y-4"
//       >
//         <div>
//           <label className="block font-medium text-sm mb-1 text-gray-700">
//             Class Name
//           </label>
//           <input
//             type="text"
//             name="className"
//             value={className}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="e.g., 10A"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
//           disabled={addLoading}
//         >
//           {addLoading ? "Adding..." : "Add Class"}
//         </button>
//       </form>

//       {/* Class List */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         {classes.length != 0 ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Class
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Total Students
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Teacher
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
//                   Actions
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
//                   Today Attendance %
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {classes.map((cls) => (
//                 <tr key={cls._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     {cls.className}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     {cls.totalStudents}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     {cls.teacher}
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       onClick={() => handleDeleteClass(cls._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                       {cls.attendancePercentage}
//                     </td>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center py-6 text-gray-500">No classes available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IClasses;

// import React, { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../../api";

// const IClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [className, setClassName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [addLoading, setAddLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch classes from updated backend
//   const fetchClasses = async () => {
//     try {
//       const res = await api.get("/institution/classes");
//       setClasses(res.data); // updated route returns array directly
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setError("Failed to fetch classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleChange = (e) => {
//     setClassName(e.target.value);
//   };

//   const handleAddClass = async (e) => {
//     e.preventDefault();
//     if (!className.trim()) return alert("Please enter a valid class name.");
//     setAddLoading(true);
//     try {
//       const res = await api.post("/institution/classes/add", { className });
//       setClasses(res.data.classes); // backend returns updated class list
//       setClassName("");
//       alert("Class added successfully");
//     } catch (err) {
//       console.error("Error adding class:", err);
//       alert(err?.response?.data?.error || "Failed to add class");
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleDeleteClass = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this class?"
//     );
//     if (!confirmed) return;
//     try {
//       await api.delete(`/institution/classes/delete/${id}`);
//       await fetchClasses(); // refetch latest class list
//     } catch (err) {
//       console.error("Error deleting class:", err);
//       alert(err?.response?.data?.message || "Failed to delete class");
//     }
//   };

//   if (loading)
//     return <div className="p-4 text-blue-500">Loading classes...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Classes</h2>

//       {/* Add Class Form */}
//       <form
//         onSubmit={handleAddClass}
//         className="mb-8 bg-white p-4 rounded-lg shadow space-y-4"
//       >
//         <div>
//           <label className="block font-medium text-sm mb-1 text-gray-700">
//             Class Name
//           </label>
//           <input
//             type="text"
//             name="className"
//             value={className}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="e.g., 10A"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
//           disabled={addLoading}
//         >
//           {addLoading ? "Adding..." : "Add Class"}
//         </button>
//       </form>

//       {/* Class List */}
//       <div className="bg-white shadow rounded-lg overflow-hidden">
//         {classes.length !== 0 ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Class
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Total Students
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
//                   Teacher
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
//                   Attendance %
//                 </th>
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {classes.map((cls) => (
//                 <tr key={cls._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     {cls.className}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     {cls.totalStudents}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
//                     {cls.teacher}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">
//                     {cls.attendancePercentage}%
//                   </td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       onClick={() => handleDeleteClass(cls._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center py-6 text-gray-500">No classes available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IClasses;

// import React, { useEffect, useMemo, useState } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../../api";

// const IClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [className, setClassName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [addLoading, setAddLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Enhancements
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);

//   const fetchClasses = async () => {
//     try {
//       const res = await api.get("/institution/classes");
//       setClasses(res.data);
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setError("Failed to fetch classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleChange = (e) => setClassName(e.target.value);

//   const handleAddClass = async (e) => {
//     e.preventDefault();
//     if (!className.trim()) return alert("Please enter a valid class name.");
//     setAddLoading(true);
//     try {
//       const res = await api.post("/institution/classes/add", { className });
//       setClasses(res.data.classes);
//       setClassName("");
//       alert("Class added successfully");
//     } catch (err) {
//       console.error("Error adding class:", err);
//       alert(err?.response?.data?.error || "Failed to add class");
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleDeleteClass = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this class?");
//     if (!confirmed) return;
//     try {
//       await api.delete(`/institution/classes/delete/${id}`);
//       await fetchClasses();
//     } catch (err) {
//       console.error("Error deleting class:", err);
//       alert(err?.response?.data?.message || "Failed to delete class");
//     }
//   };

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const sortedAndFilteredClasses = useMemo(() => {
//     let filtered = classes.filter(
//       (cls) =>
//         cls.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (cls.teacher && cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
//     );

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         const valA = a[sortConfig.key];
//         const valB = b[sortConfig.key];
//         if (valA === undefined || valB === undefined) return 0;

//         if (typeof valA === "string") {
//           return sortConfig.direction === "asc"
//             ? valA.localeCompare(valB)
//             : valB.localeCompare(valA);
//         } else {
//           return sortConfig.direction === "asc" ? valA - valB : valB - valA;
//         }
//       });
//     }

//     return filtered;
//   }, [classes, searchQuery, sortConfig]);

//   // Pagination Logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = sortedAndFilteredClasses.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(sortedAndFilteredClasses.length / recordsPerPage);

//   if (loading) return <div className="p-4 text-blue-500">Loading classes...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Classes</h2>

//       {/* Add Class Form */}
//       <form onSubmit={handleAddClass} className="mb-8 bg-white p-4 rounded-lg shadow space-y-4">
//         <div>
//           <label className="block font-medium text-sm mb-1 text-gray-700">Class Name</label>
//           <input
//             type="text"
//             value={className}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="e.g., 10A"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
//           disabled={addLoading}
//         >
//           {addLoading ? "Adding..." : "Add Class"}
//         </button>
//       </form>

//       {/* Filters and Pagination Settings */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="px-4 py-2 border rounded w-full md:w-64"
//           placeholder="Search by class or teacher"
//         />
//         <select
//           className="border rounded px-3 py-2"
//           value={recordsPerPage}
//           onChange={(e) => {
//             setRecordsPerPage(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//         >
//           {[5, 10, 20].map((num) => (
//             <option key={num} value={num}>
//               {num} per page
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Class List Table */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto">
//         {currentRecords.length !== 0 ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["className", "totalStudents", "teacher", "attendancePercentage"].map((key) => (
//                   <th
//                     key={key}
//                     onClick={() => handleSort(key)}
//                     className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-700"
//                   >
//                     {key === "className"
//                       ? "Class"
//                       : key === "totalStudents"
//                       ? "Total Students"
//                       : key === "teacher"
//                       ? "Teacher"
//                       : "Attendance %"}
//                     {sortConfig.key === key && (sortConfig.direction === "asc" ? " ↑" : " ↓")}
//                   </th>
//                 ))}
//                 <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {currentRecords.map((cls) => (
//                 <tr key={cls._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{cls.className}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{cls.totalStudents}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{cls.teacher}</td>
//                   <td className="px-6 py-4 text-sm text-center text-gray-800">{cls.attendancePercentage}%</td>
//                   <td className="px-6 py-4 text-center">
//                     <button
//                       onClick={() => handleDeleteClass(cls._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center py-6 text-gray-500">No matching classes found</p>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 space-x-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default IClasses;

// import React, { useEffect, useMemo, useState } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../../api";

// const IClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [className, setClassName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [addLoading, setAddLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);

//   const fetchClasses = async () => {
//     try {
//       const res = await api.get("/institution/classes");
//       setClasses(res.data);
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setError("Failed to fetch classes");
//     } finally {
//       setLoading(false);
//     }
//   }; 

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleChange = (e) => setClassName(e.target.value);

//   const handleAddClass = async (e) => {
//     e.preventDefault();
//     if (!className.trim()) return alert("Please enter a valid class name.");
//     setAddLoading(true);
//     try {
//       const res = await api.post("/institution/classes/add", { className });
//       setClasses(res.data.classes);
//       setClassName("");
//       alert("Class added successfully");
//     } catch (err) {
//       console.error("Error adding class:", err);
//       alert(err?.response?.data?.error || "Failed to add class");
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleDeleteClass = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this class?"
//     );
//     if (!confirmed) return;
//     try {
//       await api.delete(`/institution/classes/delete/${id}`);
//       await fetchClasses();
//     } catch (err) {
//       console.error("Error deleting class:", err);
//       alert(err?.response?.data?.message || "Failed to delete class");
//     }
//   };

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const sortedAndFilteredClasses = useMemo(() => {
//     let filtered = classes.filter(
//       (cls) =>
//         cls.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         (cls.teacher &&
//           cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
//     );

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         const valA = a[sortConfig.key];
//         const valB = b[sortConfig.key];
//         if (valA === undefined || valB === undefined) return 0;

//         if (typeof valA === "string") {
//           return sortConfig.direction === "asc"
//             ? valA.localeCompare(valB)
//             : valB.localeCompare(valA);
//         } else {
//           return sortConfig.direction === "asc" ? valA - valB : valB - valA;
//         }
//       });
//     }

//     return filtered;
//   }, [classes, searchQuery, sortConfig]);

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = sortedAndFilteredClasses.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );
//   const totalPages = Math.ceil(
//     sortedAndFilteredClasses.length / recordsPerPage
//   );

//   if (loading)
//     return <div className="p-4 text-blue-500">Loading classes...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="px-1 sm:px-1 border-2 md:px-8 py-6 w-full max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Classes</h2>

//       {/* Add Class */}
//       <form
//         onSubmit={handleAddClass}
//         className="mb-8 bg-white p-4 rounded-lg shadow space-y-4"
//       >
//         <div>
//           <label className="block font-medium text-sm mb-1 text-gray-700">
//             Class Name
//           </label>
//           <input
//             type="text"
//             value={className}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="e.g., 10A"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
//           disabled={addLoading}
//         >
//           {addLoading ? "Adding..." : "Add Class"}
//         </button>
//       </form>

//       {/* Search + Records */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full md:w-64 px-4 py-2 border rounded"
//           placeholder="Search by class or teacher"
//         />
//         <select
//           className="px-3 py-2 border rounded"
//           value={recordsPerPage}
//           onChange={(e) => {
//             setRecordsPerPage(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//         >
//           {[5, 10, 20].map((num) => (
//             <option key={num} value={num}>
//               {num} per page
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table (scrollable on mobile) */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto w-full">
//         {currentRecords.length > 0 ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {[
//                   "className",
//                   "totalStudents",
//                   "teacher",
//                   "attendancePercentage",
//                 ].map((key) => (
//                   <th
//                     key={key}
//                     onClick={() => handleSort(key)}
//                     className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
//                   >
//                     {key === "className"
//                       ? "Class"
//                       : key === "totalStudents"
//                       ? "Total Students"
//                       : key === "teacher"
//                       ? "Teacher"
//                       : "Attendance %"}
//                     {sortConfig.key === key &&
//                       (sortConfig.direction === "asc" ? " ↑" : " ↓")}
//                   </th>
//                 ))}
//                 <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {currentRecords.map((cls) => (
//                 <tr key={cls._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
//                     {cls.className}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
//                     {cls.totalStudents}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
//                     {cls.teacher}
//                   </td>
//                   <td className="px-4 py-3 text-sm text-center text-gray-800">
//                     {cls.attendancePercentage}%
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <button
//                       onClick={() => handleDeleteClass(cls._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center py-6 text-gray-500">
//             No matching classes found
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 flex-wrap gap-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === page
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default IClasses;

// import React, { useEffect, useMemo, useState } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../../api";

// const IClasses = () => {
//   const [classes, setClasses] = useState([]);
//   const [className, setClassName] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [addLoading, setAddLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(5);

//   const fetchClasses = async () => {
//     try {
//       const res = await api.get("/institution/classes");
//       setClasses(res.data);
//     } catch (err) {
//       console.error("Error fetching classes:", err);
//       setError("Failed to fetch classes");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const handleChange = (e) => setClassName(e.target.value);

//   const handleAddClass = async (e) => {
//     e.preventDefault();
//     if (!className.trim()) return alert("Please enter a valid class name.");
//     setAddLoading(true);
//     try {
//       const res = await api.post("/institution/classes/add", { className });
//       setClasses(res.data.classes);
//       setClassName("");
//       alert("Class added successfully");
//     } catch (err) {
//       console.error("Error adding class:", err);
//       alert(err?.response?.data?.error || "Failed to add class");
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   const handleDeleteClass = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this class?"
//     );
//     if (!confirmed) return;
//     try {
//       await api.delete(`/institution/classes/delete/${id}`);
//       await fetchClasses();
//     } catch (err) {
//       console.error("Error deleting class:", err);
//       alert(err?.response?.data?.message || "Failed to delete class");
//     }
//   };

//   const handleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
//       }
//       return { key, direction: "asc" };
//     });
//   };

//   const sortedAndFilteredClasses = useMemo(() => {
//     let filtered = classes.filter(
//       (cls) => cls.className.toLowerCase().includes(searchQuery.toLowerCase())
//       // (cls.teacher &&
//       // cls.teacher.toLowerCase().includes(searchQuery.toLowerCase()))
//     );

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         const valA = a[sortConfig.key];
//         const valB = b[sortConfig.key];
//         if (valA === undefined || valB === undefined) return 0;

//         if (typeof valA === "string") {
//           return sortConfig.direction === "asc"
//             ? valA.localeCompare(valB)
//             : valB.localeCompare(valA);
//         } else {
//           return sortConfig.direction === "asc" ? valA - valB : valB - valA;
//         }
//       });
//     }

//     return filtered;
//   }, [classes, searchQuery, sortConfig]);

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = sortedAndFilteredClasses.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );
//   const totalPages = Math.ceil(
//     sortedAndFilteredClasses.length / recordsPerPage
//   );

//   if (loading)
//     return <div className="p-4 text-blue-500">Loading classes...</div>;
//   if (error) return <div className="p-4 text-red-500">{error}</div>;

//   return (
//     <div className="px-1 sm:px-1 border-2 md:px-8 py-6 w-full max-w-7xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Classes</h2>

//       {/* Add Class */}
//       <form
//         onSubmit={handleAddClass}
//         className="mb-8 bg-white p-4 rounded-lg shadow space-y-4"
//       >
//         <div>
//           <label className="block font-medium text-sm mb-1 text-gray-700">
//             Class Name
//           </label>
//           <input
//             type="text"
//             value={className}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded focus:outline-none"
//             placeholder="e.g., 10A"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
//           disabled={addLoading}
//         >
//           {addLoading ? "Adding..." : "Add Class"}
//         </button>
//       </form>

//       {/* Search + Records */}
//       {/* <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full md:w-64 px-4 py-2 border rounded"
//           placeholder="Search by class or teacher"
//         />
//         <select
//           className="px-3 py-2 border rounded"
//           value={recordsPerPage}
//           onChange={(e) => {
//             setRecordsPerPage(Number(e.target.value));
//             setCurrentPage(1);
//           }}
//         >
//           {[5, 10, 20].map((num) => (
//             <option key={num} value={num}>
//               {num} per page
//             </option>
//           ))}
//         </select>
//       </div> */}

//       {/* Table (scrollable on mobile) */}
//       <div className="bg-white shadow rounded-lg overflow-x-auto w-full">
//         {currentRecords.length > 0 ? (
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 {["className", "totalStudents", "attendancePercentage"].map(
//                   (key) => (
//                     <th
//                       key={key}
//                       onClick={() => handleSort(key)}
//                       className="cursor-pointer px-4 py-3 text-left text-sm font-semibold text-gray-700 whitespace-nowrap"
//                     >
//                       {key === "className"
//                         ? "Class"
//                         : key === "totalStudents"
//                         ? "Total Students"
//                         : "Attendance %"}
//                       {sortConfig.key === key &&
//                         (sortConfig.direction === "asc" ? " ↑" : " ↓")}
//                     </th>
//                   )
//                 )}
//                 <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-100">
//               {currentRecords.map((cls) => (
//                 <tr key={cls._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
//                     {cls.className}
//                   </td>
//                   <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
//                     {cls.totalStudents}
//                   </td>

//                   <td className="px-4 py-3 text-sm text-center text-gray-800">
//                     {cls.attendancePercentage}%
//                   </td>
//                   <td className="px-4 py-3 text-center">
//                     <button
//                       onClick={() => handleDeleteClass(cls._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-center py-6 text-gray-500">
//             No matching classes found
//           </p>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-4 flex-wrap gap-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 rounded ${
//                 currentPage === page
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default IClasses;


import React, { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import api from "../../api";

const IClasses = () => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const fetchClasses = async () => {
    try {
      const res = await api.get("/institution/classes");
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError("Failed to fetch classes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => setClassName(e.target.value);

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!className.trim()) return alert("Please enter a valid class name.");
    setAddLoading(true);
    try {
      const res = await api.post("/institution/classes/add", { className });
      setClasses(res.data.classes);
      setClassName("");
      alert("Class added successfully");
    } catch (err) {
      console.error("Error adding class:", err);
      alert(err?.response?.data?.error || "Failed to add class");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteClass = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this class?");
    if (!confirmed) return;
    try {
      await api.delete(`/institution/classes/delete/${id}`);
      await fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
      alert(err?.response?.data?.message || "Failed to delete class");
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedAndFilteredClasses = useMemo(() => {
    let filtered = classes.filter((cls) =>
      cls.className.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA === undefined || valB === undefined) return 0;

        if (typeof valA === "string") {
          return sortConfig.direction === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return sortConfig.direction === "asc" ? valA - valB : valB - valA;
        }
      });
    }

    return filtered;
  }, [classes, searchQuery, sortConfig]);

  if (loading) return <div className="p-4 text-blue-500">Loading classes...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="px-2 md:px-8 py-6 w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Classes</h2>

      {/* Add Class Form */}
      <form
        onSubmit={handleAddClass}
        className="mb-8 bg-white p-4 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block font-medium text-sm mb-1 text-gray-700">
            Class Name
          </label>
          <input
            type="text"
            value={className}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
            placeholder="e.g., 10A"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
          disabled={addLoading}
        >
          {addLoading ? "Adding..." : "Add Class"}
        </button>
      </form>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded"
          placeholder="Search by class name"
        />
      </div>

      {/* Responsive Table */}
      <div className="bg-white shadow rounded-lg w-full overflow-x-auto">
        {sortedAndFilteredClasses.length > 0 ? (
          <table className="w-full table-auto text-sm md:text-base">
            <thead className="bg-gray-50">
              <tr>
                {["className", "totalStudents", "attendancePercentage"].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className="cursor-pointer px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {key === "className"
                      ? "Class"
                      : key === "totalStudents"
                      ? "Total Students"
                      : "Attendance %"}
                    {sortConfig.key === key &&
                      (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                  </th>
                ))}
                <th className="px-4 py-3 text-center font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {sortedAndFilteredClasses.map((cls) => (
                <tr key={cls._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 break-words whitespace-normal">
                    {cls.className}
                  </td>
                  <td className="px-4 py-3 text-gray-800 text-center">
                    {cls.totalStudents}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-800">
                    {cls.attendancePercentage}%
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDeleteClass(cls._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-6 text-gray-500">
            No matching classes found
          </p>
        )}
      </div>
    </div>
  );
};

export default IClasses;
