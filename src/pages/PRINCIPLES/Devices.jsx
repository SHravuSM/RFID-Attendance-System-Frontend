import React from "react";

const fakeDevices = [
  {
    id: "RFID-001",
    location: "Block A - Main Gate",
    status: "Online",
    lastSynced: "2025-03-28 10:15 AM",
  },
  {
    id: "RFID-002",
    location: "Block B - Class 10 Entrance",
    status: "Offline",
    lastSynced: "2025-03-27 06:45 PM",
  },
  {
    id: "RFID-003",
    location: "Block C - Library",
    status: "Online",
    lastSynced: "2025-03-28 09:50 AM",
  },
];

const Devices = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📡 Assigned RFID Devices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Device ID</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Location</th>
              {/* <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th> */}
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Last Synced</th>
            </tr>
          </thead>
          <tbody>
            {fakeDevices.map((device) => (
              <tr key={device.id} className="border-t border-gray-200">
                <td className="py-3 px-4 text-sm text-gray-800">{device.id}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{device.location}</td>
                {/* <td className="py-3 px-4 text-sm"> */}
                  {/* <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      device.status === "Online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {device.status}
                  </span> */}
                {/* </td> */}
                <td className="py-3 px-4 text-sm text-gray-600">{device.lastSynced}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Devices;