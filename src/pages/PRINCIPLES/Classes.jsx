import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import api from "../../api";

const IClasses = () => {
  const [newClassName, setNewClassName] = useState("");
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("className");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const res = await api.get("/institution/classes/classnames");
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!newClassName.trim()) return alert("Enter a valid class name.");
    setLoading(true);
    try {
      await api.post("/institution/classes/add", { className: newClassName });
      setNewClassName("");
      await fetchClasses();
      alert("Class added!");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Failed to add class");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (classToDelete) => {
    try {
      await api.delete(`/institution/classes/delete/${classToDelete}`);
      fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
      alert("Failed to delete class");
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  const sortedClasses = [...classes].sort((a, b) => {
    let valA, valB;

    if (sortBy === "averageAttendance") {
      valA = parseFloat(a.averageAttendance) || 0;
      valB = parseFloat(b.averageAttendance) || 0;
    } else if (sortBy === "studentCount") {
      valA = a.studentCount;
      valB = b.studentCount;
    } else {
      const extractParts = (str) => {
        const match = str.match(/^(\d+)([A-Za-z]*)$/);
        return match ? [parseInt(match[1], 10), match[2]] : [0, str];
      };

      const [numA, letterA] = extractParts(a.className);
      const [numB, letterB] = extractParts(b.className);

      if (numA !== numB) {
        return sortDirection === "asc" ? numA - numB : numB - numA;
      }

      if (letterA < letterB) return sortDirection === "asc" ? -1 : 1;
      if (letterA > letterB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    }

    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const sortArrow = (field) =>
    sortBy === field ? (sortDirection === "asc" ? " ▲" : " ▼") : "";

  return (
    <div className="w-full min-h-screen px-4 sm:px-8 pt-0 py-4 ">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-light font-mono text-indigo-800 tracking-tight">
            📚 Manage Classes
          </h1>
          <p className="text-slate-500 mt-2 text-sm sm:text-base font-semibold font-sans">
            Add or manage class records in your institution.
          </p>
        </div>

        {/* Add Class Form */}
        {/* <form
          onSubmit={handleAddClass}
          className="shadow-lg rounded-2xl sm:p-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
        >
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="e.g., 10A"
            className="flex-1 px-4 py-3 rounded-lg bg-indigo-50 border-2 border-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              <Plus size={18} />
            )}
            {loading ? "Adding..." : "Add Class"}
          </button>
        </form>
        
        */}
        <form
          onSubmit={handleAddClass}
          className="w-full max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-gray-200 pt-6"
        >
          <input
            type="text"
            value={newClassName}
            onChange={(e) => setNewClassName(e.target.value)}
            placeholder="Class name (e.g. 10A)"
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black placeholder-gray-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-neutral-800 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            {loading ? "Adding..." : "Add"}
          </button>
        </form>


        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
          <table className="w-full table-auto text-sm min-w-[600px]">
            <thead className="bg-indigo-50 text-gray-700 font-semibold">
              <tr>
                <th
                  className="px-6 py-4 cursor-pointer select-none text-left whitespace-nowrap"
                  onClick={() => handleSort("className")}
                >
                  Class Name{sortArrow("className")}
                </th>
                <th
                  className="px-6 py-4 cursor-pointer select-none text-left whitespace-nowrap"
                  onClick={() => handleSort("studentCount")}
                >
                  Students{sortArrow("studentCount")}
                </th>
                <th
                  className="px-6 py-4 cursor-pointer select-none text-left whitespace-nowrap"
                  onClick={() => handleSort("averageAttendance")}
                >
                  Avg. Attendance{sortArrow("averageAttendance")}
                </th>
                <th className="px-6 py-4 text-left whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedClasses.length > 0 ? (
                sortedClasses.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-indigo-50 transition"
                  >
                    <td className="px-6 py-4">{item.className}</td>
                    <td className="px-6 py-4">{item.studentCount}</td>
                    <td className="px-6 py-4">{item.averageAttendance}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(item.className)}
                        className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 font-medium"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IClasses;
