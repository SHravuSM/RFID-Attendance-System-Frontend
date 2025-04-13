// import { useState, useEffect } from "react";
// import { Trash2, ChevronUp, ChevronDown, Pencil } from "lucide-react";
// import api from "../../api";

// const fakeAttendance = [
//   {
//     _id: "1",
//     rollNumber: "STU001",
//     name: "Ravi Kumar",
//     type: "Student",
//     class: "6A",
//     date: "2025-03-27",
//     status: "Present",
//   },
//   {
//     _id: "2",
//     rollNumber: "STU002",
//     name: "Anjali Sharma",
//     type: "Student",
//     class: "6A",
//     date: "2025-03-27",
//     status: "Absent",
//   },
//   {
//     _id: "3",
//     rollNumber: "TEA001",
//     name: "Mr. Ramesh",
//     type: "Teacher", // this will map to 'Staff' in dropdown
//     date: "2025-03-27",
//     status: "Present",
//   },
//   {
//     _id: "4",
//     rollNumber: "TEA002",
//     name: "Mrs. Kavita",
//     type: "Teacher", // this will map to 'Staff' in dropdown
//     date: "2025-03-26",
//     status: "Present",
//   },
//   {
//     _id: "5",
//     rollNumber: "STU003",
//     name: "Suresh Yadav",
//     type: "Student",
//     class: "7B",
//     date: "2025-03-26",
//     status: "Present",
//   },
// ];

// const IAttendance = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("Student"); // Default to 'Student'
//   const [dateFilter, setDateFilter] = useState("");
//   const [classFilter, setClassFilter] = useState("All");
//   const [sortField, setSortField] = useState("date");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(3);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     id: null,
//     rollNumber: "",
//     name: "",
//     type: "Student",
//     class: "",
//     date: "",
//     status: "Present",
//   });

//   const role = "student";
//   const fetchAttendance = async () => {
//     const res = await api.get(`/institution/institutions/attendance/${role}`);
//     console.log(res.data);
//   };

//   useEffect(() => {
//     fetchAttendance();
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
//       class: record.class || "",
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
//                 type: formData.type,
//                 class: formData.type === "Student" ? formData.class : "",
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
//         type: formData.type,
//         class: formData.type === "Student" ? formData.class : "",
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
//       type: "Student",
//       class: "",
//       date: "",
//       status: "Present",
//     });
//   };

//   const classOptions = [
//     ...new Set(
//       attendanceRecords.filter((r) => r.type === "Student").map((r) => r.class)
//     ),
//   ];

//   const filteredRecords = attendanceRecords
//     .filter(
//       (rec) =>
//         (rec.type === typeFilter ||
//           (typeFilter === "Staff" && rec.type === "Teacher")) && // Map 'Staff' to 'Teacher' internally
//         (typeFilter !== "Student" ||
//           classFilter === "All" ||
//           rec.class === classFilter) &&
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
//         Attendance Control
//       </h1>

//       {/* Filters */}
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search by name or roll no"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//         />
//         <select
//           value={typeFilter}
//           onChange={(e) => {
//             setTypeFilter(e.target.value);
//             setClassFilter("All");
//           }}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//         >
//           <option value="Student">Students</option>
//           <option value="Staff">Staffs</option>{" "}
//           {/* Staff maps to Teacher internally */}
//         </select>
//         {typeFilter === "Student" && (
//           <select
//             value={classFilter}
//             onChange={(e) => setClassFilter(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//           >
//             <option value="All">All Classes</option>
//             {classOptions.map((cls) => (
//               <option key={cls} value={cls}>
//                 {cls}
//               </option>
//             ))}
//           </select>
//         )}
//         <input
//           type="date"
//           value={dateFilter}
//           onChange={(e) => setDateFilter(e.target.value)}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//         />
//         <button
//           onClick={() => setModalOpen(true)}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm text-sm"
//         >
//           + Add Attendance
//         </button>
//       </div>

//       {/* Entries per page selector */}
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
//               {["rollNumber", "name", "type", "class", "date", "status"].map(
//                 (field) => (
//                   <th
//                     key={field}
//                     className="px-6 py-3 font-semibold text-gray-700 uppercase cursor-pointer"
//                     onClick={() => handleSort(field)}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>{field}</span>
//                       {sortField === field &&
//                         (sortOrder === "asc" ? (
//                           <ChevronUp size={16} />
//                         ) : (
//                           <ChevronDown size={16} />
//                         ))}
//                     </div>
//                   </th>
//                 )
//               )}
//               <th className="px-6 py-3 text-gray-700 font-semibold">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedRecords.map((record) => (
//               <tr key={record._id} className="border-b">
//                 <td className="px-6 py-4">{record.rollNumber}</td>
//                 <td className="px-6 py-4">{record.name}</td>
//                 <td className="px-6 py-4">
//                   {record.type === "Teacher" ? "Staff" : record.type}
//                 </td>
//                 <td className="px-6 py-4">{record.class || "-"}</td>
//                 <td className="px-6 py-4">{record.date}</td>
//                 <td className="px-6 py-4">{record.status}</td>
//                 <td className="px-6 py-4">
//                   <button
//                     onClick={() => handleEdit(record)}
//                     className="text-blue-500 hover:text-blue-700"
//                   >
//                     <Pencil size={16} />
//                   </button>
//                   <button
//                     onClick={() => handleDelete(record._id)}
//                     className="ml-4 text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <div>
//           Page {currentPage} of {totalPages}
//         </div>
//         <div>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 text-white bg-gray-600 rounded-md disabled:bg-gray-300"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 text-white bg-gray-600 rounded-md disabled:bg-gray-300 ml-2"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Modal for Adding/Editing Attendance */}
//       {modalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg w-full md:w-1/2 lg:w-1/3">
//             <h3 className="text-xl font-semibold mb-4">
//               {formData.id ? "Edit Attendance" : "Add Attendance"}
//             </h3>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label
//                   htmlFor="rollNumber"
//                   className="block text-sm text-gray-600"
//                 >
//                   Roll Number
//                 </label>
//                 <input
//                   type="text"
//                   id="rollNumber"
//                   value={formData.rollNumber}
//                   onChange={(e) =>
//                     setFormData({ ...formData, rollNumber: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm text-gray-600">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="type" className="block text-sm text-gray-600">
//                   Type
//                 </label>
//                 <select
//                   id="type"
//                   value={formData.type}
//                   onChange={(e) =>
//                     setFormData({ ...formData, type: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//                 >
//                   <option value="Student">Student</option>
//                   <option value="Teacher">Teacher</option>
//                 </select>
//               </div>
//               {formData.type === "Student" && (
//                 <div className="mb-4">
//                   <label
//                     htmlFor="class"
//                     className="block text-sm text-gray-600"
//                   >
//                     Class
//                   </label>
//                   <input
//                     type="text"
//                     id="class"
//                     value={formData.class}
//                     onChange={(e) =>
//                       setFormData({ ...formData, class: e.target.value })
//                     }
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//                   />
//                 </div>
//               )}
//               <div className="mb-4">
//                 <label htmlFor="date" className="block text-sm text-gray-600">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="status" className="block text-sm text-gray-600">
//                   Status
//                 </label>
//                 <select
//                   id="status"
//                   value={formData.status}
//                   onChange={(e) =>
//                     setFormData({ ...formData, status: e.target.value })
//                   }
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
//                 >
//                   <option value="Present">Present</option>
//                   <option value="Absent">Absent</option>
//                 </select>
//               </div>
//               <div className="flex justify-between space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setModalOpen(false)}
//                   className="px-4 py-2 bg-gray-500 text-white rounded-lg"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IAttendance;


import { useState, useEffect } from "react";
import { Trash2, ChevronUp, ChevronDown, Pencil } from "lucide-react";
import api from "../../api";

const IAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Student"); // Default to 'Student'
  const [dateFilter, setDateFilter] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    rollNumber: "",
    name: "",
    type: "Student",
    class: "",
    date: "",
    status: "Present",
  });

  const role = "student";

  const fetchAttendance = async () => {
    try {
      const res = await api.get(`/institution/institutions/attendance/${role}`);
      console.log(res.data); // This will log the fetched data
      setAttendanceRecords(res.data); // Set the fetched data as attendance records
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Delete this attendance record?");
    if (confirm) {
      setAttendanceRecords((prev) => prev.filter((r) => r._id !== id));
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleEdit = (record) => {
    setFormData({
      id: record._id,
      rollNumber: record.rollNumber,
      name: record.name,
      type: record.type,
      class: record.class || "",
      date: record.date,
      status: record.status,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNumber || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.id) {
      setAttendanceRecords((prev) =>
        prev.map((r) =>
          r._id === formData.id
            ? {
                ...r,
                rollNumber: formData.rollNumber,
                name: formData.name,
                type: formData.type,
                class: formData.type === "Student" ? formData.class : "",
                date: formData.date,
                status: formData.status,
              }
            : r
        )
      );
    } else {
      const newRecord = {
        _id: Date.now().toString(),
        rollNumber: formData.rollNumber,
        name: formData.name,
        type: formData.type,
        class: formData.type === "Student" ? formData.class : "",
        date: formData.date,
        status: formData.status,
      };
      setAttendanceRecords((prev) => [newRecord, ...prev]);
    }

    setModalOpen(false);
    setFormData({
      id: null,
      rollNumber: "",
      name: "",
      type: "Student",
      class: "",
      date: "",
      status: "Present",
    });
  };

  const classOptions = [
    ...new Set(
      attendanceRecords.filter((r) => r.type === "Student").map((r) => r.class)
    ),
  ];

  const filteredRecords = attendanceRecords
    .filter(
      (rec) =>
        (rec.type === typeFilter ||
          (typeFilter === "Staff" && rec.type === "Teacher")) && // Map 'Staff' to 'Teacher' internally
        (typeFilter !== "Student" ||
          classFilter === "All" ||
          rec.class === classFilter) &&
        (!dateFilter || rec.date === dateFilter) &&
        (rec.name.toLowerCase().includes(search.toLowerCase()) ||
          rec.rollNumber.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField].localeCompare(b[sortField]);
      } else {
        return b[sortField].localeCompare(a[sortField]);
      }
    });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [recordsPerPage]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Attendance Control
      </h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or roll no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
        />
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setClassFilter("All");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
        >
          <option value="Student">Students</option>
          <option value="Staff">Staffs</option> {/* Staff maps to Teacher internally */}
        </select>
        {typeFilter === "Student" && (
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
          >
            <option value="All">All Classes</option>
            {classOptions.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        )}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-sm text-sm"
        >
          + Add Attendance
        </button>
      </div>

      {/* Entries per page selector */}
      <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
        <span>Entries per page:</span>
        <select
          value={recordsPerPage}
          onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={filteredRecords.length}>All</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              {["rollNumber", "name", "type", "class", "date", "status"].map(
                (field) => (
                  <th
                    key={field}
                    className="px-6 py-3 font-semibold text-gray-700 uppercase cursor-pointer"
                    onClick={() => handleSort(field)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{field}</span>
                      {sortField === field &&
                        (sortOrder === "asc" ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        ))}
                    </div>
                  </th>
                )
              )}
              <th className="px-6 py-3 text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((record) => (
              <tr key={record._id} className="border-b">
                <td className="px-6 py-4">{record.rollNumber}</td>
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4">
                  {record.type === "Teacher" ? "Staff" : record.type}
                </td>
                <td className="px-6 py-4">{record.class}</td>
                <td className="px-6 py-4">{record.date}</td>
                <td className="px-6 py-4">{record.status}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="text-yellow-600 hover:text-yellow-800"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>
          <span className="mx-2">{currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-600">
          Showing {(currentPage - 1) * recordsPerPage + 1} -{" "}
          {Math.min(currentPage * recordsPerPage, filteredRecords.length)} of{" "}
          {filteredRecords.length}
        </span>
      </div>

      {/* Modal for Add/Edit Attendance */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-xl shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">
              {formData.id ? "Edit Attendance" : "Add Attendance"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Roll Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.rollNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, rollNumber: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="Student">Student</option>
                  <option value="Teacher">Teacher</option>
                </select>
              </div>
              {formData.type === "Student" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Class
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.class}
                    onChange={(e) =>
                      setFormData({ ...formData, class: e.target.value })
                    }
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-500 text-white rounded-lg px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-lg px-4 py-2"
                >
                  {formData.id ? "Save Changes" : "Add Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IAttendance;
