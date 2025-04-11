// import React, { useEffect, useState } from "react";
// import api from "../../api";
// import { FaSearch, FaDownload, FaSortUp, FaSortDown } from "react-icons/fa";

// export default function IStudents() {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await api.get("/institution/students");
//         const data = res.data;
//         setStudents(data);
//         setFilteredStudents(data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   useEffect(() => {
//     let updated = [...students];
//     if (searchTerm.trim() !== "") {
//       updated = updated.filter((student) =>
//         student.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (sortConfig.key !== "") {
//       updated.sort((a, b) => {
//         const aValue = a[sortConfig.key] || "";
//         const bValue = b[sortConfig.key] || "";
//         if (sortConfig.direction === "asc") {
//           return aValue.localeCompare(bValue);
//         } else {
//           return bValue.localeCompare(aValue);
//         }
//       });
//     }

//     setFilteredStudents(updated);
//   }, [searchTerm, students, sortConfig]);

//   const openModal = (student) => {
//     setSelectedStudent(student);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setSelectedStudent(null);
//     setShowModal(false);
//   };

//   const toggleSort = (key) => {
//     setSortConfig((prev) => {
//       if (prev.key === key) {
//         return {
//           key,
//           direction: prev.direction === "asc" ? "desc" : "asc",
//         };
//       } else {
//         return { key, direction: "asc" };
//       }
//     });
//   };

//   const renderSortIcon = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === "asc" ? (
//         <FaSortUp className="inline ml-1" />
//       ) : (
//         <FaSortDown className="inline ml-1" />
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">
//             Registered Students
//           </h2>
//           <div className="text-gray-600 mt-2 md:mt-0">
//             Total Students:{" "}
//             <span className="text-blue-600 font-semibold">
//               {filteredStudents.length}
//             </span>
//           </div>
//         </div>

//         {/* Search Bar */}
//         <div className="relative mb-6 max-w-md">
//           <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm w-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           />
//         </div>

//         {/* Student Table */}
//         {filteredStudents.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
//               <thead className="bg-blue-100 text-blue-800">
//                 <tr>
//                   <th
//                     className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
//                     onClick={() => toggleSort("name")}
//                   >
//                     Name {renderSortIcon("name")}
//                   </th>
//                   <th
//                     className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
//                     onClick={() => toggleSort("className")}
//                   >
//                     Class {renderSortIcon("className")}
//                   </th>
//                   <th
//                     className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
//                     onClick={() => toggleSort("rollNumber")}
//                   >
//                     Roll No {renderSortIcon("rollNumber")}
//                   </th>
//                   <th className="text-left px-6 py-3 text-sm font-semibold uppercase">
//                     Parent Name
//                   </th>
//                   <th className="text-left px-6 py-3 text-sm font-semibold uppercase">
//                     Parent Contact
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredStudents.map((student, index) => (
//                   <tr
//                     key={student._id}
//                     className={`cursor-pointer transition hover:bg-blue-50 ${
//                       index % 2 === 0 ? "bg-white" : "bg-gray-50"
//                     }`}
//                     onClick={() => openModal(student)}
//                   >
//                     <td className="px-6 py-4 text-gray-800 font-medium">
//                       {student.name}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">
//                       {student.className}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">
//                       {student.rollNumber}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">
//                       {student.parentName}
//                     </td>
//                     <td className="px-6 py-4 text-gray-700">
//                       {student.parentContactNumber}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center mt-10 text-gray-500 text-lg">
//             No students found.
//           </div>
//         )}

//         {/* Modal */}
//         {showModal && selectedStudent && (
//           <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
//             <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative p-6">
//               {/* Close Button */}
//               <button
//                 className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
//                 onClick={closeModal}
//               >
//                 &times;
//               </button>

//               <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
//                 {selectedStudent.name}'s Profile
//               </h3>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
//                 <p>
//                   <span className="font-semibold">Full Name:</span>{" "}
//                   {selectedStudent.name}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Class:</span>{" "}
//                   {selectedStudent.className}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Roll Number:</span>{" "}
//                   {selectedStudent.rollNumber}
//                 </p>
//                 <p>
//                   <span className="font-semibold">RFID ID:</span>{" "}
//                   {selectedStudent.rfidId || "N/A"}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Parent Name:</span>{" "}
//                   {selectedStudent.parentName}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Parent Contact:</span>{" "}
//                   {selectedStudent.parentContactNumber}
//                 </p>
//                 <p className="sm:col-span-2">
//                   <span className="font-semibold">Address:</span>{" "}
//                   {selectedStudent.address || "N/A"}
//                 </p>
//               </div>

//               {/* Download Button */}
//               <div className="flex justify-end mt-6">
//                 <button
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   onClick={() => alert("Download report triggered (dummy)")}
//                 >
//                   <FaDownload />
//                   Download Report
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import api from "../../api";
import { FaSearch, FaDownload, FaSortUp, FaSortDown } from "react-icons/fa";

export default function IStudents() {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/institution/students");

        const studentsData = res.data.students || [];
        const classesData = res.data.classes || [];

        setStudents(studentsData);
        setFilteredStudents(studentsData);
        setClasses(["All", ...classesData]); // 'All' for default option
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let updated = [...students];

    if (searchTerm.trim()) {
      updated = updated.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedClass !== "All") {
      updated = updated.filter(
        (student) => student.className === selectedClass
      );
    }

    if (sortConfig.key) {
      updated.sort((a, b) => {
        const aVal = a[sortConfig.key] || "";
        const bVal = b[sortConfig.key] || "";
        return sortConfig.direction === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      });
    }

    setFilteredStudents(updated);
  }, [students, searchTerm, selectedClass, sortConfig]);

  const toggleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <FaSortUp className="inline ml-1" />
    ) : (
      <FaSortDown className="inline ml-1" />
    );
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Registered Students
          </h2>
          <div className="text-gray-600 mt-2 md:mt-0">
            Total Students:{" "}
            <span className="text-blue-600 font-semibold">
              {filteredStudents.length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 shadow-sm w-full text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          {/* Class Dropdown */}
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="py-2 px-4 border border-gray-300 rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls === "All" ? "All Classes" : cls}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {filteredStudents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th
                    onClick={() => toggleSort("name")}
                    className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
                  >
                    Name {renderSortIcon("name")}
                  </th>
                  <th
                    onClick={() => toggleSort("className")}
                    className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
                  >
                    Class {renderSortIcon("className")}
                  </th>
                  <th
                    onClick={() => toggleSort("rollNumber")}
                    className="text-left px-6 py-3 text-sm font-semibold uppercase cursor-pointer"
                  >
                    Roll No {renderSortIcon("rollNumber")}
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold uppercase">
                    Parent Name
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-semibold uppercase">
                    Parent Contact
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`cursor-pointer transition hover:bg-blue-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    onClick={() => openModal(student)}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {student.className}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {student.rollNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {student.parentName}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {student.parentContactNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-500 text-lg">
            No students found.
          </div>
        )}

        {/* Modal */}
        {showModal && selectedStudent && (
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
                {selectedStudent.name}'s Profile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {selectedStudent.name}
                </p>
                <p>
                  <span className="font-semibold">Class:</span>{" "}
                  {selectedStudent.className}
                </p>
                <p>
                  <span className="font-semibold">Roll Number:</span>{" "}
                  {selectedStudent.rollNumber}
                </p>
                <p>
                  <span className="font-semibold">RFID ID:</span>{" "}
                  {selectedStudent.rfidId || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Parent Name:</span>{" "}
                  {selectedStudent.parentName}
                </p>
                <p>
                  <span className="font-semibold">Parent Contact:</span>{" "}
                  {selectedStudent.parentContactNumber}
                </p>
                <p className="sm:col-span-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {selectedStudent.address || "N/A"}
                </p>
              </div>

              {/* Download Button */}
              <div className="flex justify-end mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
