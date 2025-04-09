import React, { useEffect, useState } from "react";
import api from "../../api";

const IDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDevices = async () => {
    try {
      const res = await api.get("/institution/rfid/devices");
      const deviceIds = res.data.deviceIds;
      setDevices(deviceIds);
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="px-2 md:px-8 py-6 w-full max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📡 Assigned RFID Devices
      </h2>

      {loading ? (
        <p className="p-4 text-blue-500">Loading devices...</p>
      ) : devices.length > 0 ? (
        <div className="bg-white shadow rounded-lg w-full overflow-x-auto">
          <table className="w-full table-auto text-sm md:text-base">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700 whitespace-nowrap">
                  Device ID
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {devices.map((deviceId) => (
                <tr key={deviceId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 break-words whitespace-normal">
                    {deviceId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center py-6 text-gray-500">
          No devices assigned to this institution.
        </p>
      )}
    </div>
  );
};

export default IDevices;
