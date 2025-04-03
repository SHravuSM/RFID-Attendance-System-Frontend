// const Classes = () => {
//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-semibold mb-4">Classes</h1>
//         <p className="text-gray-600">List of all classes will appear here.</p>
//       </div>
//     );
//   };
  
//   export default Classes;

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

const fakeClasses = [
  { id: 1, className: "8A", totalStudents: 35, teacher: "Ms. Sneha Iyer" },
  { id: 2, className: "8B", totalStudents: 37, teacher: "Mr. Sahil Khan" },
  { id: 3, className: "9A", totalStudents: 40, teacher: "Mr. Karan Joshi" },
  { id: 4, className: "9B", totalStudents: 38, teacher: "Mrs. Priya Nair" },
  { id: 5, className: "10A", totalStudents: 42, teacher: "Mr. Arjun Reddy" },
  { id: 6, className: "10B", totalStudents: 41, teacher: "Mr. Ravi Kumar" },
];

const Classes = () => {
  const [classes, setClasses] = useState(fakeClasses);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const classesPerPage = 4;

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this class?");
    if (confirmed) {
      setClasses(classes.filter((cls) => cls.id !== id));
    }
  };

  // Filtered Data
  const filteredClasses = classes.filter((cls) =>
    cls.className.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * classesPerPage;
  const indexOfFirst = indexOfLast - classesPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Classes</h1>

      {/* Search */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
        <input
          type="text"
          placeholder="Search by Class Name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Classes Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Class Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total Students</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Class Teacher</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentClasses.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{cls.className}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{cls.totalStudents}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{cls.teacher}</td>
                <td className="px-6 py-4 whitespace-nowrap flex justify-center space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Pencil size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDelete(cls.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {currentClasses.length === 0 && (
          <p className="text-center text-gray-500 py-4">No classes found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>    
    </div>
  );
};

export default Classes;