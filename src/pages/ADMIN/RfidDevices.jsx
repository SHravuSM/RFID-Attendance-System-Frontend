import { useState, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";

const fakeDevices = [
  { id: "RFID001", school: "Green Valley High", status: "Active" },
  { id: "RFID002", school: "Sunshine Public", status: "Inactive" },
  { id: "RFID003", school: "Blue Bells Academy", status: "Active" },
];

const DeviceRow = ({ device, onDelete, onToggleStatus }) => (
  <tr key={device.id} className="hover:bg-gray-50">
    <td className="px-6 py-4 text-sm text-gray-800">{device.id}</td>
    <td className="px-6 py-4 text-sm text-gray-800">{device.school}</td>
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
        className="text-green-600 hover:text-green-800 text-xs"
        onClick={() => onToggleStatus(device.id)}
      >
        Toggle Status
      </button>
      <button className="text-blue-600 hover:text-blue-800">
        <Pencil size={18} />
      </button>
      <button
        className="text-red-600 hover:text-red-800"
        onClick={() => onDelete(device.id)}
      >
        <Trash2 size={18} />
      </button>
    </td>
  </tr>
);

const RfidDevices = () => {
  const [devices, setDevices] = useState(fakeDevices);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const devicesPerPage = 5;

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

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (confirm) {
      setDevices((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setDevices((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" }
          : d
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">RFID Devices</h1>

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

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Device ID</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">School</th>
              <th className="px-6 py-3 text-left text-sm text-gray-700">Status</th>
              <th className="px-6 py-3 text-center text-sm text-gray-700">Actions</th>
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

export default RfidDevices;