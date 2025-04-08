import { useState, useEffect } from "react";
import { Trash2, ChevronUp, ChevronDown, Pencil } from "lucide-react";

const fakeAttendance = [
  {
    _id: "1",
    rollNumber: "STU001",
    name: "Ravi Kumar",
    type: "Student",
    class: "6A",
    date: "2025-03-27",
    status: "Present",
  },
  {
    _id: "2",
    rollNumber: "STU002",
    name: "Anjali Sharma",
    type: "Student",
    class: "6A",
    date: "2025-03-27",
    status: "Absent",
  },
  {
    _id: "3",
    rollNumber: "TEA001",
    name: "Mr. Ramesh",
    type: "Teacher",
    date: "2025-03-27",
    status: "Present",
  },
  {
    _id: "4",
    rollNumber: "TEA002",
    name: "Mrs. Kavita",
    type: "Teacher",
    date: "2025-03-26",
    status: "Present",
  },
  {
    _id: "5",
    rollNumber: "STU003",
    name: "Suresh Yadav",
    type: "Student",
    class: "7B",
    date: "2025-03-26",
    status: "Present",
  },
];

const IAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(3); // <-- made it dynamic

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

  useEffect(() => {
    setAttendanceRecords(fakeAttendance);
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
      // Edit
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
      // Add
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
      attendanceRecords
        .filter((r) => r.type === "Student")
        .map((r) => r.class)
    ),
  ];

  const filteredRecords = attendanceRecords
    .filter(
      (rec) =>
        (typeFilter === "All" || rec.type === typeFilter) &&
        (typeFilter !== "Student" || classFilter === "All" || rec.class === classFilter) &&
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
    setCurrentPage(1); // Reset to page 1 when recordsPerPage changes
  }, [recordsPerPage]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Attendance Control</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <input
          type="text"
          placeholder="Search by name or roll no"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setClassFilter("All");
          }}
          className="px-4 py-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Student">Students</option>
          <option value="Teacher">Teachers</option>
        </select>
        {typeFilter === "Student" && (
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-4 py-2 border rounded"
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
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Attendance
        </button>
      </div>

      {/* Entries per page selector */}
      <div className="flex items-center space-x-2 mb-4">
        <label className="text-sm text-gray-600">Entries per page:</label>
        <select
          value={recordsPerPage}
          onChange={(e) => setRecordsPerPage(Number(e.target.value))}
          className="px-2 py-1 border rounded text-sm"
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={filteredRecords.length}>All</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["rollNumber", "name", "type", "class", "date", "status"].map((field) => (
                <th
                  key={field}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort(field)}
                >
                  {field.toUpperCase()}{" "}
                  {sortField === field &&
                    (sortOrder === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
                </th>
              ))}
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {paginatedRecords.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{record.rollNumber}</td>
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4">{record.type}</td>
                <td className="px-6 py-4">{record.class || "-"}</td>
                <td className="px-6 py-4">{record.date}</td>
                <td className="px-6 py-4">{record.status}</td>
                <td className="px-6 py-4 flex space-x-2">
                  <button onClick={() => handleEdit(record)}>
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(record._id)}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedRecords.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {paginatedRecords.length} of {filteredRecords.length} records
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"
            }`}
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Attendance Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
              </select>
              {formData.type === "Student" && (
                <input
                  type="text"
                  placeholder="Class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              )}
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  {formData.id ? "Update" : "Add"}
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