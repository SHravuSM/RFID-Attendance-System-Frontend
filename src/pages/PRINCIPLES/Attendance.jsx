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
        (typeFilter === "All" || rec.type === typeFilter) &&
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
          <option value="All">All</option>
          <option value="Student">Students</option>
          <option value="Teacher">Teachers</option>
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
              <tr key={record._id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">{record.rollNumber}</td>
                <td className="px-6 py-4">{record.name}</td>
                <td className="px-6 py-4">{record.type}</td>
                <td className="px-6 py-4">{record.class || "-"}</td>
                <td className="px-6 py-4">{record.date}</td>
                <td className="px-6 py-4">{record.status}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedRecords.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {paginatedRecords.length} of {filteredRecords.length} records
        </span>
        <div className="space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IAttendance;
