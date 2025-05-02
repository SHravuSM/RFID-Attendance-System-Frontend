// import { useState, useEffect } from "react";
// import { Trash2, ChevronUp, ChevronDown, Pencil } from "lucide-react";

// const fakeAttendance = [
//   {
//     _id: "1",
//     rollNumber: "TEA001",
//     name: "Mr. Ramesh",
//     type: "Teacher",
//     date: "2025-03-27",
//     status: "Present",
//   },
//   {
//     _id: "2",
//     rollNumber: "TEA002",
//     name: "Mrs. Kavita",
//     type: "Teacher",
//     date: "2025-03-26",
//     status: "Present",
//   },
// ];

// const Teachers = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const [dateFilter, setDateFilter] = useState("");
//   const [sortField, setSortField] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(3);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     rollNumber: "",
//     name: "",
//     type: "Teacher",
//     class: "", // Will remain unused but kept for consistency
//     date: "",
//     status: "Present",
//   });

//   useEffect(() => {
//     setAttendanceRecords(fakeAttendance);
//   }, []);

//   const handleDelete = (id) => {
//     const confirm = window.confirm("Delete this attendance record?");
//     if (confirm) {
//       setAttendanceRecords((prev) => prev.filter((r) => r._id !== id));
//     }
//   };

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   const handleEdit = (record) => {
//     setFormData({
//       id: record._id,
//       rollNumber: record.rollNumber,
//       name: record.name,
//       type: record.type,
//       class: "", // always blank for teachers
//       date: record.date,
//       status: record.status,
//     });
//     setModalOpen(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.rollNumber || !formData.date) {
//       alert("Please fill all required fields");
//       return;
//     }

//     if (formData.id) {
//       setAttendanceRecords((prev) =>
//         prev.map((r) =>
//           r._id === formData.id
//             ? {
//                 ...r,
//                 rollNumber: formData.rollNumber,
//                 name: formData.name,
//                 type: "Teacher",
//                 date: formData.date,
//                 status: formData.status,
//               }
//             : r
//         )
//       );
//     } else {
//       const newRecord = {
//         _id: Date.now().toString(),
//         rollNumber: formData.rollNumber,
//         name: formData.name,
//         type: "Teacher",
//         date: formData.date,
//         status: formData.status,
//       };
//       setAttendanceRecords((prev) => [newRecord, ...prev]);
//     }

//     setModalOpen(false);
//     setFormData({
//       id: null,
//       rollNumber: "",
//       name: "",
//       type: "Teacher",
//       class: "",
//       date: "",
//       status: "Present",
//     });
//   };

//   const filteredRecords = attendanceRecords
//     .filter(
//       (rec) =>
//         (!dateFilter || rec.date === dateFilter) &&
//         (rec.name.toLowerCase().includes(search.toLowerCase()) ||
//           rec.rollNumber.toLowerCase().includes(search.toLowerCase()))
//     )
//     .sort((a, b) => {
//       if (sortOrder === "asc") {
//         return a[sortField].localeCompare(b[sortField]);
//       } else {
//         return b[sortField].localeCompare(a[sortField]);
//       }
//     });

//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
//   const paginatedRecords = filteredRecords.slice(
//     (currentPage - 1) * recordsPerPage,
//     currentPage * recordsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [recordsPerPage]);

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">
//         Teacher Attendance
//       </h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or roll no"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//         />
//         <input
//           type="date"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//         />
//         <div></div>
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm text-sm"
//         >
//           + Add Attendance
//         </button>
//       </div>

//       {/* Entries per page */}
//       <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
//         <span>Entries per page:</span>
//         <select
//           value={recordsPerPage}
//           onChange={(e) => setRecordsPerPage(Number(e.target.value))}
//           className="px-2 py-1 border rounded-md text-sm"
//         >
//           <option value={3}>3</option>
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={filteredRecords.length}>All</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-gray-50">
//             <tr>
//               {["rollNumber", "name", "date", "status"].map((field) => (
//                 <th
//                   key={field}
//                   className="px-6 py-3 font-semibold text-gray-700 uppercase cursor-pointer"
//                   onClick={() => handleSort(field)}
//                 >
//                   <div className="flex items-center space-x-1">
//                     <span>{field}</span>
//                     {sortField === field &&
//                       (sortOrder === "asc" ? (
//                         <ChevronUp size={16} />
//                       ) : (
//                         <ChevronDown size={16} />
//                       ))}
//                   </div>
//                 </th>
//               ))}
//               <th className="px-6 py-3 text-gray-700 font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedRecords.map((record) => (
//               <tr key={record._id} className="border-t hover:bg-gray-50">
//                 <td className="px-6 py-4">{record.rollNumber}</td>
//                 <td className="px-6 py-4">{record.name}</td>
//                 <td className="px-6 py-4">{record.date}</td>
//                 <td className="px-6 py-4">{record.status}</td>
//                 <td className="px-6 py-4 flex items-center space-x-2">
//                   <button
//                     onClick={() => handleEdit(record)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <Pencil size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(record._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {paginatedRecords.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-500">
//                   No records found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 space-x-2">
//           {Array.from({ length: totalPages }).map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setCurrentPage(i + 1)}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 currentPage === i + 1
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {modalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
//           >
//             <h2 className="text-xl font-semibold mb-4">
//               {formData.id ? "Edit Attendance" : "Add Attendance"}
//             </h2>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Roll Number"
//                 value={formData.rollNumber}
//                 onChange={(e) =>
//                   setFormData({ ...formData, rollNumber: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-md"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-md"
//                 required
//               />
//               <input
//                 type="date"
//                 value={formData.date}
//                 onChange={(e) =>
//                   setFormData({ ...formData, date: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-md"
//                 required
//               />
//               <select
//                 value={formData.status}
//                 onChange={(e) =>
//                   setFormData({ ...formData, status: e.target.value })
//                 }
//                 className="w-full px-4 py-2 border rounded-md"
//               >
//                 <option value="Present">Present</option>
//                 <option value="Absent">Absent</option>
//               </select>
//             </div>
//             <div className="flex justify-end space-x-2 mt-4">
//               <button
//                 type="button"
//                 onClick={() => setModalOpen(false)}
//                 className="px-4 py-2 rounded-md bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 rounded-md bg-blue-600 text-white"
//               >
//                 {formData.id ? "Update" : "Add"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Teachers;

import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaSearch, FaDownload } from "react-icons/fa";

export default function ITeachers() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get("/institution/teachers");
        const data = res.data;
        setTeachers(data);
        setFilteredTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const filtered = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(filtered);
  }, [searchTerm, teachers]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase() || "";
    const valB = b[sortField]?.toString().toLowerCase() || "";

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const openModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTeacher(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen rounded-lg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Registered Teachers</h2>
          <div className="text-gray-600 mt-2 md:mt-0">
            Total Teachers:{" "}
            <span className="text-green-600 font-semibold">
              {filteredTeachers.length}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 max-w-md">
          <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm w-full text-sm focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {/* Teacher Table */}
        {filteredTeachers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
              <thead className="bg-green-100 text-green-800">
                <tr>
                  <th
                    className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
                    onClick={() => handleSort("className")}
                  >
                    Class {sortField === "className" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
                    onClick={() => handleSort("subject")}
                  >
                    Subject {sortField === "subject" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="text-left px-6 py-3 text-sm font-semibold uppercase"
                  >
                    Email
                  </th>
                  <th
                    className="text-left px-6 py-3 text-sm font-semibold uppercase"
                  >
                    Phone
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedTeachers.map((teacher, index) => (
                  <tr
                    key={teacher._id}
                    className={`cursor-pointer transition hover:bg-green-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    onClick={() => openModal(teacher)}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">{teacher.name}</td>
                    <td className="px-6 py-4 text-gray-700">{teacher.className}</td>
                    <td className="px-6 py-4 text-gray-700">{teacher.subject}</td>
                    <td className="px-6 py-4 text-gray-700">{teacher.email}</td>
                    <td className="px-6 py-4 text-gray-700">{teacher.contactNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-500 text-lg">
            No teachers found.
          </div>
        )}

        {/* Modal */}
        {showModal && selectedTeacher && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative p-6">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                onClick={closeModal}
              >
                &times;
              </button>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
                {selectedTeacher.name}'s Profile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <p><span className="font-semibold">Full Name:</span> {selectedTeacher.name}</p>
                <p><span className="font-semibold">Subject:</span> {selectedTeacher.subject}</p>
                <p><span className="font-semibold">Email:</span> {selectedTeacher.email}</p>
                <p><span className="font-semibold">Phone:</span> {selectedTeacher.contactNumber}</p>
                <p className="sm:col-span-2"><span className="font-semibold">Address:</span> {selectedTeacher.address || "N/A"}</p>
              </div>

              {/* Download Button */}
              <div className="flex justify-end mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  onClick={() => alert("Download report triggered (dummy)")}
                >
                  <FaDownload />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
