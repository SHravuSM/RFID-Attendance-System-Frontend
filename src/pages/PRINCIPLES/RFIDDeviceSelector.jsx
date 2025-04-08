import React, { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api";

const RFIDDeviceSelector = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [rfidDevices, setRfidDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await api.get(`/institution/rfid/devices`);
        const data = await res.data; // assuming axios — no need for .json()
        console.log("RFID Devices:", data.deviceIds);
        setRfidDevices(data.deviceIds || []);
      } catch (err) {
        console.error("Error fetching RFID devices:", err);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Select an RFID Device</h1>

      {rfidDevices.length === 0 ? (
        <p className="text-gray-500">No devices found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {rfidDevices.map((deviceId) => {
            const isSelected = deviceId === selectedDeviceId;
            return (
              <div
                key={deviceId}
                onClick={() => setSelectedDeviceId(deviceId)}
                className={`cursor-pointer border p-4 rounded-2xl shadow transition-all duration-200 
                  ${
                    isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold">RFID Device</h2>
                  {isSelected ? (
                    <CheckCircle2 className="text-blue-600" />
                  ) : (
                    <Circle className="text-gray-400" />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  ID: <span className="font-mono">{deviceId}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}

      {selectedDeviceId && (
        <div className="mt-6 flex justify-center">
          <NavLink
            to={`${selectedDeviceId}/add-student`}
            className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            Confirm
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default RFIDDeviceSelector;