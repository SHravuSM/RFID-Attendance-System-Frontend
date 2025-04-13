// import { useEffect, useState, useMemo } from "react";
// import { Pencil, PlusCircle, PlusCircleIcon, Trash2 } from "lucide-react";
// import api from "../../api";
// import { NavLink } from "react-router-dom";

// const DeviceRow = ({ device, onDelete, onToggleStatus }) => (
//   <tr key={device.id} className="hover:bg-gray-50">
//     <td className="px-6 py-4 text-sm text-gray-800">{device.id}</td>
//     <td className="px-6 py-4 text-sm text-gray-800">
//       {device.institutionName}
//     </td>
//     <td className="px-6 py-4 text-sm text-gray-800">
//       <span
//         className={`px-2 py-1 rounded-full text-xs ${
//           device.status === "Active"
//             ? "bg-green-100 text-green-700"
//             : "bg-red-100 text-red-700"
//         }`}
//       >
//         {device.status}
//       </span>
//     </td>
//     <td className="px-6 py-4 flex justify-center space-x-4">
//       <button
//         className="text-red-600 hover:text-red-800"
//         onClick={() => onDelete(device.id)}
//       >
//         <Trash2 size={18} />
//       </button>
//     </td>
//   </tr>
// );

// const ARfidDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const devicesPerPage = 5;

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const res = await api.get("/admin/rfiddevices");
//         setDevices(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching devices:", err);
//         setError("Failed to load devices.");
//         setLoading(false);
//       }
//     };

//     fetchDevices();
//   }, []);

//   const handleDelete = async (deviceId) => {
//     const confirm = window.confirm("Are you sure you want to delete?");
//     if (!confirm) return;

//     try {
//       // console.log("Hi");
//       const res = await api.delete(`/admin/rfiddevices/${deviceId}`);
//       setDevices((prev) => prev.filter((d) => d.id !== deviceId));
//       alert(res.data.message);
//     } catch (err) {
//       console.error("Error deleting device:", err);
//       alert("Failed to delete device.");
//     }
//   };

//   const handleToggleStatus = (id) => {
//     setDevices((prev) =>
//       prev.map((d) =>
//         d.id === id
//           ? {
//               ...d,
//               status: d.status === "Active" ? "Inactive" : "Active",
//             }
//           : d
//       )
//     );
//     // Optionally: send status update to backend
//   };

//   const filteredDevices = useMemo(() => {
//     return devices.filter((d) =>
//       d.id.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, devices]);

//   const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
//   const currentDevices = useMemo(() => {
//     const start = (currentPage - 1) * devicesPerPage;
//     return filteredDevices.slice(start, start + devicesPerPage);
//   }, [currentPage, filteredDevices]);

//   if (loading) {
//     return <div className="p-8 text-gray-600">Loading devices...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">
//         RFID Devices
//       </h1>
//       <div className="flex items-start justify-between">
//         <input
//           type="text"
//           placeholder="Search by Device ID"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full md:w-1/3 px-4 py-2 border rounded mb-4"
//         />

//         <NavLink
//           to="/ADMIN/assign-device"
//           className="flex items-center gap-2 h-10 bg-white text-indigo-700 px-4 rounded-lg font-medium hover:bg-gray-100 transition"
//         >
//           <PlusCircleIcon size={16} /> Assign Device
//         </NavLink>
//       </div>

//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Device ID
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Institution
//               </th>
//               <th className="px-6 py-3 text-left text-sm text-gray-700">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-center text-sm text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentDevices.length > 0 ? (
//               currentDevices.map((d) => (
//                 <DeviceRow
//                   key={d.id}
//                   device={d}
//                   onDelete={handleDelete}
//                   onToggleStatus={handleToggleStatus}
//                 />
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-6 text-center text-gray-500">
//                   No devices found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between items-center mt-6">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages || 1}
//         </p>
//         <div className="flex space-x-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ARfidDevices;

// import { useEffect, useState, useMemo } from "react";
// import { Trash2, PlusCircleIcon } from "lucide-react";
// import api from "../../api";
// import { NavLink } from "react-router-dom";

// const DeviceRow = ({ device, onDelete, onToggleStatus }) => (
//   <tr key={device.id} className="hover:bg-gray-50 transition-all">
//     <td className="px-6 py-4 text-sm text-gray-800">{device.id}</td>
//     <td className="px-6 py-4 text-sm text-gray-800">{device.institutionName}</td>
//     <td className="px-6 py-4 text-sm">
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${
//           device.status === "Active"
//             ? "bg-green-100 text-green-700"
//             : "bg-red-100 text-red-700"
//         }`}
//       >
//         {device.status}
//       </span>
//     </td>
//     <td className="px-6 py-4">
//       <div className="flex justify-center items-center gap-4">
//         <button
//           onClick={() => onDelete(device.id)}
//           className="text-red-600 hover:text-red-800 transition"
//         >
//           <Trash2 size={18} />
//         </button>
//       </div>
//     </td>
//   </tr>
// );

// const ARfidDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const devicesPerPage = 5;

//   useEffect(() => {
//     const fetchDevices = async () => {
//       try {
//         const res = await api.get("/admin/rfiddevices");
//         setDevices(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching devices:", err);
//         setError("Failed to load devices.");
//         setLoading(false);
//       }
//     };
//     fetchDevices();
//   }, []);

//   const handleDelete = async (deviceId) => {
//     if (!window.confirm("Are you sure you want to delete?")) return;

//     try {
//       const res = await api.delete(`/admin/rfiddevices/${deviceId}`);
//       setDevices((prev) => prev.filter((d) => d.id !== deviceId));
//       alert(res.data.message);
//     } catch (err) {
//       console.error("Error deleting device:", err);
//       alert("Failed to delete device.");
//     }
//   };

//   const filteredDevices = useMemo(() => {
//     return devices.filter((d) =>
//       d.id.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, devices]);

//   const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
//   const currentDevices = useMemo(() => {
//     const start = (currentPage - 1) * devicesPerPage;
//     return filteredDevices.slice(start, start + devicesPerPage);
//   }, [currentPage, filteredDevices]);

//   if (loading) {
//     return <div className="p-8 text-gray-600">Loading devices...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">RFID Devices</h1>
//         <NavLink
//           to="/ADMIN/assign-device"
//           className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
//         >
//           <PlusCircleIcon size={18} /> Assign Device
//         </NavLink>
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by Device ID"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full sm:max-w-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//         />
//       </div>

//       <div className="overflow-x-auto bg-white rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-gray-700 font-medium">Device ID</th>
//               <th className="px-6 py-3 text-left text-gray-700 font-medium">Institution</th>
//               <th className="px-6 py-3 text-left text-gray-700 font-medium">Status</th>
//               <th className="px-6 py-3 text-center text-gray-700 font-medium">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentDevices.length > 0 ? (
//               currentDevices.map((d) => (
//                 <DeviceRow
//                   key={d.id}
//                   device={d}
//                   onDelete={handleDelete}
//                   onToggleStatus={() => {}}
//                 />
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center text-gray-500 py-6">
//                   No devices found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
//         <p className="text-sm text-gray-600">
//           Page {currentPage} of {totalPages || 1}
//         </p>
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages || totalPages === 0}
//             className="px-4 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ARfidDevices;

import { useEffect, useState, useMemo } from "react";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import api from "../../api";
import { NavLink } from "react-router-dom";

// Device row component
const DeviceRow = ({ device, onDelete, onToggleStatus }) => (
  <tr key={device.id} className="hover:bg-gray-50 transition">
    <td className="px-6 py-4 text-sm text-gray-800">{device.id}</td>
    <td className="px-6 py-4 text-sm text-gray-800">
      {device.institutionName}
    </td>
    <td className="px-6 py-4 text-sm text-gray-800">
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          device.status === "Active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {device.status}
      </span>
    </td>
    <td className="px-6 py-4 flex justify-center space-x-4">
      <button
        className="text-red-600 hover:text-red-800 transition"
        onClick={() => onDelete(device.id)}
      >
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);

// Main component
const ARfidDevices = () => {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const devicesPerPage = 5;

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await api.get("/admin/rfiddevices");
        setDevices(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setError("Failed to load devices.");
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleDelete = async (deviceId) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    try {
      const res = await api.delete(`/admin/rfiddevices/${deviceId}`);
      setDevices((prev) => prev.filter((d) => d.id !== deviceId));
      alert(res.data.message);
    } catch (err) {
      console.error("Error deleting device:", err);
      alert("Failed to delete device.");
    }
  };

  const handleToggleStatus = (id) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: d.status === "Active" ? "Inactive" : "Active",
            }
          : d
      )
    );
    // Optionally send status update to backend
  };

  const filteredDevices = useMemo(() => {
    return devices.filter((d) =>
      d.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, devices]);

  const totalPages = Math.ceil(filteredDevices.length / devicesPerPage);
  const currentDevices = useMemo(() => {
    const start = (currentPage - 1) * devicesPerPage;
    return filteredDevices.slice(start, start + devicesPerPage);
  }, [currentPage, filteredDevices]);

  if (loading) return <div className="p-8 text-gray-600">Loading devices...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">RFID Devices</h1>

      {/* Search and Assign */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        {/* Assign Button */}
        <NavLink
          to="/ADMIN/assign-device"
          className="flex items-center justify-center gap-2 h-10 bg-indigo-600 text-white px-4 rounded-lg font-medium hover:bg-indigo-700 transition w-full md:w-auto"
        >
          <PlusCircleIcon size={18} /> Assign Device
        </NavLink>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by Device ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Device ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentDevices.length > 0 ? (
              currentDevices.map((d) => (
                <DeviceRow
                  key={d.id}
                  device={d}
                  onDelete={handleDelete}
                  onToggleStatus={handleToggleStatus}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No devices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-3">
        <p className="text-sm text-gray-600 text-center sm:text-left">
          Page {currentPage} of {totalPages || 1}
        </p>
        <div className="flex justify-center sm:justify-end space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARfidDevices;
