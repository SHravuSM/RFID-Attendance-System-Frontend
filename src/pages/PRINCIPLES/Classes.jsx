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
