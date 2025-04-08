// import { useState, useEffect } from "react";
// import { Pencil, Trash2 } from "lucide-react";
// import api from "../../api";

// const AStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [selectedClass, setSelectedClass] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [studentsPerPage, setStudentsPerPage] = useState(5);
//   const [sortConfig, setSortConfig] = useState({
//     key: "name",
//     direction: "asc",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/admin/students");
//       setStudents(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch students");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this student?"
//     );
//     if (confirmed) {
//       try {
//         await api.delete(`/admin/students/${id}`);
//         fetchStudents();
//       } catch (err) {
//         alert(err.response?.data?.message || "Error deleting student.");
//       }
//     }
//   };

//   const groupedStudents = students.reduce((acc, student) => {
//     const cls = student.class || student.className;
//     if (!acc[cls]) acc[cls] = [];
//     acc[cls].push(student);
//     return acc;
//   }, {});

//   const sortedClasses = Object.keys(groupedStudents).sort();

//   const filteredStudents = students
//     .filter((student) => {
//       const cls = student.class || student.className;
//       return (
//         (selectedClass === "All" || cls === selectedClass) &&
//         (student.name.toLowerCase().includes(search.toLowerCase()) ||
//           student.rollNumber.toLowerCase().includes(search.toLowerCase()))
//       );
//     })
//     .sort((a, b) => {
//       const aVal = a[sortConfig.key] || a.className;
//       const bVal = b[sortConfig.key] || b.className;
//       if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
//       if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
//       return 0;
//     });

//   const indexOfLast = currentPage * studentsPerPage;
//   const indexOfFirst = indexOfLast - studentsPerPage;
//   const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc")
//       direction = "desc";
//     setSortConfig({ key, direction });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) return "⇅";
//     return sortConfig.direction === "asc" ? "▲" : "▼";
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">Students</h1>

//       {loading && (
//         <p className="text-center text-gray-600">Loading students...</p>
//       )}
//       {error && <p className="text-center text-red-600">Error: {error}</p>}

//       {!loading && !error && (
//         <>
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
//             <input
//               type="text"
//               placeholder="Search by name or roll number..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <select
//               value={selectedClass}
//               onChange={(e) => {
//                 setSelectedClass(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Classes</option>
//               {sortedClasses.map((className) => (
//                 <option key={className} value={className}>
//                   {className}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={studentsPerPage}
//               onChange={(e) => {
//                 setStudentsPerPage(Number(e.target.value));
//                 setCurrentPage(1);
//               }}
//               className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               {[5, 10, 15, 20].map((count) => (
//                 <option key={count} value={count}>
//                   {count} per page
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="overflow-x-auto bg-white shadow rounded-lg">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th
//                     onClick={() => handleSort("rollNumber")}
//                     className="px-6 py-3 text-left cursor-pointer"
//                   >
//                     Roll No {getSortIcon("rollNumber")}
//                   </th>
//                   <th
//                     onClick={() => handleSort("name")}
//                     className="px-6 py-3 text-left cursor-pointer"
//                   >
//                     Name {getSortIcon("name")}
//                   </th>
//                   <th
//                     onClick={() => handleSort("class")}
//                     className="px-6 py-3 text-left cursor-pointer"
//                   >
//                     Class {getSortIcon("class")}
//                   </th>
//                   <th
//                     onClick={() => handleSort("contact")}
//                     className="px-6 py-3 text-left cursor-pointer"
//                   >
//                     Contact {getSortIcon("contact")}
//                   </th>
//                   <th className="px-6 py-3 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {currentStudents.map((student) => (
//                   <tr
//                     key={student.id || student.rollNumber}
//                     className="hover:bg-gray-50 transition"
//                   >
//                     <td className="px-6 py-4">{student.rollNumber}</td>
//                     <td className="px-6 py-4">{student.name}</td>
//                     <td className="px-6 py-4">
//                       {student.class || student.className}
//                     </td>
//                     <td className="px-6 py-4">{student.contact}</td>
//                     <td className="px-6 py-4 flex justify-center space-x-4">
//                       <button
//                         className="text-red-600 hover:text-red-800"
//                         onClick={() => handleDelete(student.id)}
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {currentStudents.length === 0 && (
//               <p className="text-center text-gray-500 py-4">
//                 No students found.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default AStudents;


import { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import api from "../../api";

const AStudents = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editStudent, setEditStudent] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", rollNumber: "", class: "", contact: "" });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/students");
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch students.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;
    try {
      await api.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting student.");
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const filteredStudents = students
    .filter((s) => {
      const cls = s.class || s.className;
      return (
        (selectedClass === "All" || cls === selectedClass) &&
        (s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.rollNumber.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .sort((a, b) => {
      const aVal = a[sortConfig.key] || a.className;
      const bVal = b[sortConfig.key] || b.className;
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const classOptions = [...new Set(students.map((s) => s.class || s.className))].sort();

  const openEditModal = (student) => {
    setEditStudent(student);
    setEditForm({
      name: student.name,
      rollNumber: student.rollNumber,
      class: student.class || student.className,
      contact: student.contact,
    });
  };

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await api.put(`/admin/students/${editStudent.id}`, editForm);
      setEditStudent(null);
      setEditForm({ name: "", rollNumber: "", class: "", contact: "" });
      fetchStudents();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Students</h1>

      {loading && <p className="text-center text-gray-600">Loading students...</p>}
      {error && <p className="text-center text-red-600">Error: {error}</p>}

      {!loading && !error && (
        <>
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
            <input
              type="text"
              placeholder="Search by name or roll number..."
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
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
            <select
              value={studentsPerPage}
              onChange={(e) => {
                setStudentsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full md:w-1/4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[5, 10, 20].map((num) => (
                <option key={num} value={num}>
                  {num} per page
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["rollNumber", "name", "class", "contact"].map((col) => (
                    <th
                      key={col}
                      onClick={() => handleSort(col)}
                      className="px-6 py-3 text-left cursor-pointer"
                    >
                      {col.charAt(0).toUpperCase() + col.slice(1)} {getSortIcon(col)}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStudents.map((s) => (
                  <tr key={s.id || s.rollNumber} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{s.rollNumber}</td>
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4">{s.class || s.className}</td>
                    <td className="px-6 py-4">{s.contact}</td>
                    <td className="px-6 py-4 flex justify-center space-x-4">
                      <button onClick={() => openEditModal(s)} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {currentStudents.length === 0 && (
              <p className="text-center text-gray-500 py-4">No students found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center space-x-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Edit Modal */}
      {editStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Edit Student</h2>
            <input
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={editForm.rollNumber}
              onChange={(e) => setEditForm({ ...editForm, rollNumber: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Class"
              value={editForm.class}
              onChange={(e) => setEditForm({ ...editForm, class: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Contact"
              value={editForm.contact}
              onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEditStudent(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AStudents;