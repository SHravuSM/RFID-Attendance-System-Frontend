import { useEffect, useState, useMemo } from "react";
import { Pencil, PlusCircle, PlusCircleIcon, Trash2 } from "lucide-react";
import api from "../../api";
import { NavLink } from "react-router-dom";

const DeviceRow = ({ device, onDelete, onToggleStatus }) => (
  <tr key={device.id} className="hover:bg-gray-50">
    <td className="px-6 py-4 text-sm text-gray-800">{device.id}</td>
    <td className="px-6 py-4 text-sm text-gray-800">
      {device.institutionName}
    </td>
    <td className="px-6 py-4 text-sm text-gray-800">
      <span
        className={`px-2 py-1 rounded-full text-xs ${
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
        className="text-red-600 hover:text-red-800"
        onClick={() => onDelete(device.id)}
      >
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);

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
      console.log("Hi");
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
    // Optionally: send status update to backend
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

  if (loading) {
    return <div className="p-8 text-gray-600">Loading devices...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        RFID Devices
      </h1>
      <div className="flex items-start justify-between">
        <input
          type="text"
          placeholder="Search by Device ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 px-4 py-2 border rounded mb-4"
        />

        <NavLink
          to="/ADMIN/assign-device"
          className="flex items-center gap-2 h-10 bg-white text-indigo-700 px-4 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          <PlusCircleIcon size={16} /> Assign Device
        </NavLink>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-700">
                Device ID
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">
                Institution
              </th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">
                Status
              </th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
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

      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-gray-600">
          Page {currentPage} of {totalPages || 1}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARfidDevices;
