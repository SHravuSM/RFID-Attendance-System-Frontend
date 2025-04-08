import React, { useEffect, useState } from "react";
import api from "../../api";

export default function ITeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get("/institution/teachers");
        const data = res.data;
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Registered Teachers</h2>
      <ul className="space-y-2">
        {teachers.length > 0 ? (
          teachers.map((teacher) => (
            <li
              key={teacher._id}
              className="p-4 bg-white shadow rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-gray-800">{teacher.name}</p>
              <p className="text-sm text-gray-600">
                Subject: {teacher.subject}
              </p>
              <p className="text-sm text-gray-500">
                Contact: {teacher.contactNumber}
              </p>
            </li>
          ))
        ) : (
          <p>No teachers registered yet.</p>
        )}
      </ul>
    </div>
  );
}
