import React, { useEffect, useState } from "react";
import api from "../../api";

export default function IStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/institution/students");
        const data = res.data;
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registered Students</h2>
      <ul className="space-y-2">
        {students.length > 0 ? (
          students.map((student) => (
            <li
              key={student._id}
              className="p-4 bg-white shadow rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-gray-800">{student.name}</p>
              <p className="text-sm text-gray-600">
                Class: {student.class} | Roll: {student.rollNumber}
              </p>
              <p className="text-sm text-gray-500">
                Parent: {student.parentName} | Contact:{" "}
                {student.parentContactNumber}
              </p>
            </li>
          ))
        ) : (
          <p>No students registered yet.</p>
        )}
      </ul>
    </div>
  );
}
