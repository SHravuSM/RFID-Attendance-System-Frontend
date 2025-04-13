// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../api";

// const InstitutionDetail = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const para = useParams();

//   const fetchInstitutionDetails = async () => {
//     try {
//       const res = await api.get(
//         `/admin/institutions/institution/${para.institutionName}`
//       );
//       setData(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching institution data:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchInstitutionDetails();
//   }, [para.institutionName]);

//   if (loading)
//     return <div className="text-center text-xl mt-10">Loading...</div>;

//   if (!data)
//     return (
//       <div className="text-center text-red-600 mt-10">
//         Institution data not found.
//       </div>
//     );

//   const {
//     institution,
//     studentsCount,
//     teachersCount,
//     staffsCount,
//     studentAttendance,
//     teacherAttendance,
//     staffAttendance,
//     averageStudentAttendance,
//     averageTeacherAttendance,
//     averageStaffAttendance,
//     classWiseStrength = {}, // Default to empty object
//     classTeacherMap = {}, // Default to empty object
//     subscriptionStatus,
//     subscriptionStartDate,
//     subscriptionEndDate,
//     allsubscriptions,
//     deviceCount,
//   } = data;

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6 text-blue-800">
//         {data.institution.institutionName}
//       </h1>

//       {/* Section 1: Principal & Institution Details */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           🧑‍🏫 Principal & Institution Info
//         </h2>
//         <ul className="grid grid-cols-2 gap-4 text-gray-800">
//           <li>
//             <strong>Principal:</strong> {data.institution.principalName}
//           </li>
//           <li>
//             <strong>Contact:</strong> {data.institution.contactNumber}
//           </li>
//           <li>
//             <strong>Email:</strong> {data.institution.email}
//           </li>
//           <li>
//             <strong>Code:</strong> {data.institution.institutionCode}
//           </li>
//           <li>
//             <strong>Address:</strong>{" "}
//             {data.institution.address || "Not Provided"}
//           </li>
//         </ul>
//       </section>

//       {/* Section 2: Core Stats */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           📊 Core Statistics
//         </h2>
//         <div className="grid grid-cols-3 gap-6">
//           <StatCard
//             title="Students"
//             count={data.students.total}
//             color="green"
//           />
//           <StatCard title="Teachers" count={data.teachers.total} color="blue" />
//           <StatCard title="Staffs" count={data.staff.total} color="purple" />
//           <StatCard
//             title="Devices Allotted"
//             count={data.institution.totalDevices}
//             color="yellow"
//             totalDevices
//           />
//         </div>
//       </section>

//       {/* Section 3: Attendance Summary */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           📅 Attendance Overview
//         </h2>
//         <div className="grid grid-cols-3 gap-6">
//           <StatCard
//             title="Avg Student Attendance (%)"
//             count={data.students.averageStudentAttendance}
//             color="teal"
//           />
//           <StatCard
//             title="Avg Teacher Attendance (%)"
//             count={data.teachers.averageTeacherAttendance}
//             color="cyan"
//           />
//           <StatCard
//             title="Avg Staff Attendance (%)"
//             count={data.staff.averageStaffAttendance}
//             color="indigo"
//           />
//         </div>
//       </section>

//       {/* Section 4: Classes Overview */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           🏫 Classwise Details
//         </h2>
//         <table className="min-w-full border text-left bg-white">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="px-4 py-2">Class</th>
//               <th className="px-4 py-2">Student Strength</th>
//               <th className="px-4 py-2">Assigned Teacher</th>
//             </tr>
//           </thead>
//           {/* <tbody>
//             {Object.keys(classWiseStrength).map((className) => (
//               <tr key={className} className="border-t">
//                 <td className="px-4 py-2">{className}</td>
//                 <td className="px-4 py-2">{classWiseStrength[className]}</td>
//                 <td className="px-4 py-2">
//                   {classTeacherMap[className] || "Not Assigned"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//            */}
//           <tbody>
//             {Object.entries(classWiseStrength)
//               .sort(([a], [b]) => a.localeCompare(b))
//               .map(([className, strength]) => (
//                 <tr key={className} className="border-t">
//                   <td className="px-4 py-2">{className}</td>
//                   <td className="px-4 py-2">{strength}</td>
//                   <td className="px-4 py-2">
//                     {classTeacherMap[className] || "Not Assigned"}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </section>

//       {/* Section 5: Subscriptions */}
//       <section className="mb-10">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">
//           💼 Subscription Details
//         </h2>
//         <ul className="text-gray-800 space-y-2">
//           <li>
//             <strong>Status:</strong> {data.institution.subscriptionStatus}
//           </li>
//           <li>
//             <strong>Current Start Date:</strong>{" "}
//             {data.institution.subscriptionStartDate
//               ? new Date(
//                   data.institution.subscriptionStartDate
//                 ).toLocaleDateString()
//               : "N/A"}
//           </li>
//           <li>
//             <strong>Current Expiry:</strong>{" "}
//             {data.institution.subscriptionEndDate
//               ? new Date(
//                   data.institution.subscriptionEndDate
//                 ).toLocaleDateString()
//               : "N/A"}
//           </li>
//           <li>
//             <strong>Past Subscriptions:</strong>
//             <ul className="list-disc list-inside ml-4 mt-1">
//               {data.institution.allsubscriptions?.map((sub, idx) => (
//                 <li key={idx}>{sub.subscribedDate}</li>
//               )) || <li>No history</li>}
//             </ul>
//           </li>
//         </ul>
//       </section>
//     </div>
//   );
// };

// const StatCard = ({ title, count, color }) => (
//   <div
//     className={`bg-${color}-100 border-l-4 border-${color}-500 text-${color}-700 p-4 shadow-md rounded`}
//   >
//     <div className="text-lg font-semibold">{title}</div>
//     <div className="text-2xl">{count}</div>
//   </div>
// );

// export default InstitutionDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

const InstitutionDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const para = useParams();

  const fetchInstitutionDetails = async () => {
    try {
      const res = await api.get(
        `/admin/institutions/institution/${para.institutionName}`
      );
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching institution data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutionDetails();
  }, [para.institutionName]);

  if (loading)
    return (
      <div className="text-center text-xl mt-20 text-gray-600">Loading...</div>
    );

  if (!data)
    return (
      <div className="text-center text-red-500 mt-20 text-xl">
        Institution data not found.
      </div>
    );

  const {
    institution,
    studentsCount,
    teachersCount,
    staffsCount,
    studentAttendance,
    teacherAttendance,
    staffAttendance,
    averageStudentAttendance,
    averageTeacherAttendance,
    averageStaffAttendance,
    classWiseStrength = {},
    classTeacherMap = {},
    subscriptionStatus,
    subscriptionStartDate,
    subscriptionEndDate,
    allsubscriptions,
    deviceCount,
  } = data;

  return (
    <div className="px-6 py-10 max-w-6xl mx-auto space-y-10 text-gray-800">
      <header>
        <h1 className="text-4xl font-bold text-blue-900 tracking-tight">
          {institution.institutionName}
        </h1>
        <p className="text-gray-500 mt-1">Institution Overview</p>
      </header>

      {/* Principal & Institution Info */}
      <section>
        <SectionHeader title="🧑‍🏫 Principal & Institution Info" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-[16px]">
          <InfoItem label="Principal" value={institution.principalName} />
          <InfoItem label="Contact" value={institution.contactNumber} />
          <InfoItem label="Email" value={institution.email} />
          <InfoItem label="Code" value={institution.institutionCode} />
          <InfoItem
            label="Address"
            value={institution.address || "Not Provided"}
          />
        </div>
      </section>

      {/* Core Stats */}
      <section>
        <SectionHeader title="📊 Core Statistics" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            title="Students"
            count={data.students.total}
            color="green"
          />
          <StatCard title="Teachers" count={data.teachers.total} color="blue" />
          <StatCard title="Staffs" count={data.staff.total} color="purple" />
          <StatCard
            title="Devices Allotted"
            count={institution.totalDevices}
            color="yellow"
          />
        </div>
      </section>

      {/* Attendance Overview */}
      <section>
        <SectionHeader title="📅 Attendance Overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <StatCard
            title="Avg Student Attendance (%)"
            count={data.students.averageStudentAttendance}
            color="teal"
          />
          <StatCard
            title="Avg Teacher Attendance (%)"
            count={data.teachers.averageTeacherAttendance}
            color="cyan"
          />
          <StatCard
            title="Avg Staff Attendance (%)"
            count={data.staff.averageStaffAttendance}
            color="indigo"
          />
        </div>
      </section>

      {/* Classwise Details */}
      <section>
        <SectionHeader title="🏫 Classwise Details" />
        <div className="overflow-x-auto rounded border border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50 text-gray-600 text-left text-sm">
              <tr>
                <th className="px-4 py-2">Class</th>
                <th className="px-4 py-2">Student Strength</th>
                <th className="px-4 py-2">Assigned Teacher</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Object.entries(classWiseStrength)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([className, strength]) => (
                  <tr
                    key={className}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">{className}</td>
                    <td className="px-4 py-2">{strength}</td>
                    <td className="px-4 py-2">
                      {classTeacherMap[className] || "Not Assigned"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Subscription Details */}
      <section>
        <SectionHeader title="💼 Subscription Details" />
        <ul className="space-y-2 text-[16px]">
          <InfoItem label="Status" value={institution.subscriptionStatus} />
          <InfoItem
            label="Current Start Date"
            value={
              institution.subscriptionStartDate
                ? new Date(
                    institution.subscriptionStartDate
                  ).toLocaleDateString()
                : "N/A"
            }
          />
          <InfoItem
            label="Current Expiry"
            value={
              institution.subscriptionEndDate
                ? new Date(institution.subscriptionEndDate).toLocaleDateString()
                : "N/A"
            }
          />
          <li>
            <span className="font-semibold">Past Subscriptions:</span>
            <ul className="list-disc list-inside ml-5 mt-1 text-sm text-gray-600">
              {institution.allsubscriptions?.length > 0 ? (
                institution.allsubscriptions.map((sub, idx) => (
                  <li key={idx}>{sub.subscribedDate}</li>
                ))
              ) : (
                <li>No history</li>
              )}
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};

// === 🧩 Components ===

const StatCard = ({ title, count, color }) => (
  <div
    className={`bg-${color}-50 border-l-4 border-${color}-500 text-${color}-800 px-4 py-5 rounded shadow-sm`}
  >
    <div className="text-sm font-medium">{title}</div>
    <div className="text-2xl font-bold mt-1">{count}</div>
  </div>
);

const SectionHeader = ({ title }) => (
  <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2 mb-4">
    {title}
  </h2>
);

const InfoItem = ({ label, value }) => (
  <div>
    <span className="font-semibold">{label}:</span> {value}
  </div>
);

export default InstitutionDetail;
