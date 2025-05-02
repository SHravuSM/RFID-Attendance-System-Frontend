// import { useState, useEffect } from "react";
// import { Trash2, ChevronUp, ChevronDown, Pencil } from "lucide-react";
// import api from "../../api";

// const IAttendance = () => {
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("student");
//   const [dateFilter, setDateFilter] = useState("");
//   const [classFilter, setClassFilter] = useState("");
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

//   // const fetchAttendance = async () => {
//   //   try {
//   //     const today = new Date().toISOString().split("T")[0];
//   //     setDateFilter(today);
//   //     const res = await api.get(`/institution/institutions/attendance/${typeFilter}`);
//   //     setAttendanceRecords(res.data);
//   //   } catch (error) {
//   //     console.error("Error fetching attendance data:", error);
//   //   }
//   // };

//   const fetchAttendance = async () => {
//     try {
//       const today = new Date().toISOString().split("T")[0];
//       setDateFilter(today);
//       const res = await api.get(`/institution/institutions/attendance/${typeFilter}`);
//       const data = res.data;
//       setAttendanceRecords(data);

//       // Pick a random class from student records
//       if (typeFilter === "student") {
//         const studentClasses = [...new Set(
//           data
//             .filter((r) => r.role === "student" && r.className)
//             .map((r) => r.className)
//         )];

//         if (studentClasses.length > 0) {
//           const randomClass = studentClasses[Math.floor(Math.random() * studentClasses.length)];
//           setClassFilter(randomClass);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching attendance data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAttendance();
//   }, [typeFilter]);

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
//       class: record.className || "",
//       date: dateFilter,
//       status:
//         record.attendance.find((a) => a.date === dateFilter)?.status || "Absent",
//     });
//     setModalOpen(true);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.rollNumber || !formData.date) {
//       alert("Please fill all required fields");
//       return;
//     }

//     const updatedRecord = {
//       _id: formData.id || Date.now().toString(),
//       rollNumber: formData.rollNumber,
//       name: formData.name,
//       type: formData.type,
//       className: formData.type === "Student" ? formData.class : "",
//       attendance: [{ date: formData.date, status: formData.status }],
//       role: formData.type.toLowerCase(),
//     };

//     if (formData.id) {
//       setAttendanceRecords((prev) =>
//         prev.map((r) => (r._id === formData.id ? updatedRecord : r))
//       );
//     } else {
//       setAttendanceRecords((prev) => [updatedRecord, ...prev]);
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
//       attendanceRecords
//         .filter((r) => r.role === "student")
//         .map((r) => r.className)
//     ),
//   ];

//   const filteredRecords = attendanceRecords
//     .filter((rec) => {
//       const matchRole = rec.role === typeFilter;
//       const matchClass =
//         typeFilter !== "student" || rec.className === classFilter;
//       const matchDate = !dateFilter || rec.attendance.some((a) => a.date === dateFilter);
//       const matchSearch =
//         rec.name.toLowerCase().includes(search.toLowerCase()) ||
//         rec.rollNumber.toLowerCase().includes(search.toLowerCase());
//       return matchRole && matchClass && matchDate && matchSearch;
//     })
//     .sort((a, b) => {
//       const aValue =
//         sortField === "date"
//           ? a.attendance.find((d) => d.date === dateFilter)?.date || ""
//           : a[sortField] || "";
//       const bValue =
//         sortField === "date"
//           ? b.attendance.find((d) => d.date === dateFilter)?.date || ""
//           : b[sortField] || "";
//       return sortOrder === "asc"
//         ? aValue.localeCompare(bValue)
//         : bValue.localeCompare(aValue);
//     });

//   const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
//   const paginatedRecords = filteredRecords.slice(
//     (currentPage - 1) * recordsPerPage,
//     currentPage * recordsPerPage
//   );

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [recordsPerPage, typeFilter, classFilter, search, dateFilter]);

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
//             setClassFilter("1");
//           }}
//           className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//         >
//           <option value="student">Students</option>
//           <option value="teacher">Teachers</option>
//           <option value="staff">Staffs</option>
//         </select>
//         {typeFilter === "student" && (
//           <select
//             value={classFilter}
//             onChange={(e) => setClassFilter(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
//           >
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

//       {/* Records per page */}
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
//               {["name", "rollNumber", "className", "status"].map((field) => (
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
//               {/* <th className="px-6 py-3 text-gray-700 font-semibold">Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedRecords.map((record) => {
//               const attendanceToday = record.attendance.find(
//                 (a) => a.date == dateFilter
//               );
//               return (
//                 <tr key={record._id} className="border-b">
//                   <td className="px-6 py-4">{record.name}</td>
//                   <td className="px-6 py-4">{record.rollNumber}</td>
//                   <td className="px-6 py-4">{record.className}</td>
//                   <td className="px-6 text-green-600 font-semibold py-4">
//                     {attendanceToday ? "Present" : "Absent"}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 border rounded-lg"
//           >
//             Previous
//           </button>
//           <span className="mx-2">{currentPage}</span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 border rounded-lg"
//           >
//             Next
//           </button>
//         </div>
//         <span className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </span>
//       </div>
//       {modalOpen && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
//           <div className="bg-white p-6 rounded-xl shadow-md w-96">
//             <h2 className="text-xl font-semibold mb-4">
//               {formData.id ? "Edit Attendance" : "Add Attendance"}
//             </h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Roll Number
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.rollNumber}
//                   onChange={(e) =>
//                     setFormData({ ...formData, rollNumber: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.name}
//                   onChange={(e) =>
//                     setFormData({ ...formData, name: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Type
//                 </label>
//                 <select
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.type}
//                   onChange={(e) =>
//                     setFormData({ ...formData, type: e.target.value })
//                   }
//                 >
//                   <option value="Student">Student</option>
//                   <option value="Teacher">Teacher</option>
//                 </select>
//               </div>
//               {formData.type === "Student" && (
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Class
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full px-4 py-2 border rounded-lg"
//                     value={formData.class}
//                     onChange={(e) =>
//                       setFormData({ ...formData, class: e.target.value })
//                     }
//                   />
//                 </div>
//               )}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.date}
//                   onChange={(e) =>
//                     setFormData({ ...formData, date: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Status
//                 </label>
//                 <select
//                   className="w-full px-4 py-2 border rounded-lg"
//                   value={formData.status}
//                   onChange={(e) =>
//                     setFormData({ ...formData, status: e.target.value })
//                   }
//                 >
//                   <option value="Present">Present</option>
//                   <option value="Absent">Absent</option>
//                 </select>
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setModalOpen(false)}
//                   className="bg-gray-500 text-white rounded-lg px-4 py-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white rounded-lg px-4 py-2"
//                 >
//                   {formData.id ? "Save Changes" : "Add Record"}
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
import { Trash2, ChevronUp, ChevronDown, Pencil, CircleX, Check } from "lucide-react";
import api from "../../api";

const IAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("student");
  const [dateFilter, setDateFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    rollNumber: "",
    name: "",
    type: "Student",
    class: "",
    date: "",
    status: "Present",
  });

  const fetchAttendance = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      setDateFilter(today);
      const res = await api.get(`/institution/institutions/attendance/${typeFilter}`);
      const data = res.data;
      setAttendanceRecords(data);

      // Pick a random class from student records
      if (typeFilter === "student") {
        const studentClasses = [...new Set(
          data
            .filter((r) => r.role === "student" && r.className)
            .map((r) => r.className)
        )];

        if (studentClasses.length > 0) {
          const randomClass = studentClasses[Math.floor(Math.random() * studentClasses.length)];
          setClassFilter(randomClass);
        }
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [typeFilter]);

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
      class: record.className || "",
      date: dateFilter,
      status:
        record.attendance.find((a) => a.date === dateFilter)?.status || "Absent",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNumber || !formData.date) {
      alert("Please fill all required fields");
      return;
    }

    const updatedRecord = {
      _id: formData.id || Date.now().toString(),
      rollNumber: formData.rollNumber,
      name: formData.name,
      type: formData.type,
      className: formData.type === "Student" ? formData.class : "",
      attendance: [{ date: formData.date, status: formData.status }],
      role: formData.type.toLowerCase(),
    };

    if (formData.id) {
      setAttendanceRecords((prev) =>
        prev.map((r) => (r._id === formData.id ? updatedRecord : r))
      );
    } else {
      setAttendanceRecords((prev) => [updatedRecord, ...prev]);
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
      attendanceRecords
        .filter((r) => r.role === "student")
        .map((r) => r.className)
    ),
  ];

  const filteredRecords = attendanceRecords
    .filter((rec) => {
      const matchRole = rec.role === typeFilter;
      const matchClass =
        typeFilter !== "student" || rec.className === classFilter;
      const matchDate = !dateFilter || rec.attendance.some((a) => a.date === dateFilter);
      const matchSearch =
        rec.name.toLowerCase().includes(search.toLowerCase()) ||
        rec.rollNumber.toLowerCase().includes(search.toLowerCase());
      return matchRole && matchClass && matchDate && matchSearch;
    })
    .sort((a, b) => {
      const aValue =
        sortField === "date"
          ? a.attendance.find((d) => d.date === dateFilter)?.date || ""
          : a[sortField] || "";
      const bValue =
        sortField === "date"
          ? b.attendance.find((d) => d.date === dateFilter)?.date || ""
          : b[sortField] || "";
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [recordsPerPage, typeFilter, classFilter, search, dateFilter]);

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
            setClassFilter("1");
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
        >
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="staff">Staffs</option>
        </select>
        {typeFilter === "student" && (
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm"
          >
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

      {/* Records per page */}
      <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
        <span>Entries per page:</span>
        <select
          value={recordsPerPage}
          onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          className="px-2 py-1 border rounded-md text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={filteredRecords.length}>All</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50">
            <tr>
              {["name", "rollNumber", "className", "status"].map((field) => (
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
              ))}
              {/* <th className="px-6 py-3 text-gray-700 font-semibold">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedRecords.map((record) => {
              const attendanceToday = record.attendance.find(
                (a) => a.date == dateFilter
              );
              return (
                <tr key={record._id}
                  className="border-b hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedRecord(record);
                    setModalOpen(true);
                  }}>
                  <td className="px-6 py-4">{record.name}</td>
                  <td className="px-6 py-4">{record.rollNumber}</td>
                  <td className="px-6 py-4">{record.className}</td>
                  <td className="px-6 text-green-500 items-center font-semibold py-4 flex ">
                    {attendanceToday.morningEntry ? <Check className="h-5 w-5" /> : <CircleX className="h-4 text-red-500 w-4" />}
                    <span className="mx-2 text-blue-950 rounded-full">|</span>
                    {attendanceToday.eveningEntry ? <Check className="h-5 w-5" /> : <CircleX className="h-4 text-red-500 w-4" />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>
          <span className="mx-2">{currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
      </div>
      {modalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 transition-all duration-500 ease-in-out">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl m-2 p-8 relative transition-transform transform ">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
              onClick={() => {
                setModalOpen(false);
                setSelectedRecord(null);
              }}
            >
              <svg className="w-6 h-6 border p-1 rounded-full bg-red-500 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
                Attendance Details
              </h2>

              <div className="space-y-4">
                <p className="text-xl text-gray-800">
                  <span className="font-semibold text-gray-700">Name:</span> {selectedRecord.name}
                </p>
                <p className="text-xl text-gray-800">
                  <span className="font-semibold text-gray-700">Roll Number:</span> {selectedRecord.rollNumber}
                </p>
                {selectedRecord.className && (
                  <p className="text-xl text-gray-800">
                    <span className="font-semibold text-gray-700">Class:</span> {selectedRecord.className}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-300 pt-6 mt-6">
                <h3 className="text-2xl font-medium text-gray-900 mb-0">Attendance History</h3>

                <table className="min-w-full table-auto border-collapse mt-6">
                  <thead>
                    <tr className="text-left bg-gray-100">
                      <th className="px-4 py-2 text-lg font-semibold text-gray-700 border-b">Date</th>
                      <th className="px-4 py-2 text-lg font-semibold text-gray-700 border-b">Morning Entry</th>
                      <th className="px-4 py-2 text-lg font-semibold text-gray-700 border-b">Evening Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRecord.attendance?.map((entry, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 border-b">{entry.date}</td>
                        <td className="px-4 py-3 text-green-500 border-b">{entry.morningEntry || <span className="text-red-500 pl-3">Absent</span>}</td>
                        <td className="px-4 py-3 text-green-500 border-b">{entry.eveningEntry || <span className="text-red-500 pl-3">Absent</span>}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>


            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  // Handle custom feature like adding a comment or note to the record
                  alert("Feature Coming Soon!");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-200"
              >
                Add Note
              </button>
              <button
                onClick={() => {
                  // Handle custom feature like sending a report
                  alert("Feature Coming Soon!");
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none transition-colors duration-200"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      )
      }


    </div >
  );
};

export default IAttendance;