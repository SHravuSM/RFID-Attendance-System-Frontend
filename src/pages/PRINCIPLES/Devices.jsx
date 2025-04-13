import React, { useEffect, useState } from "react";
import { HiOutlineChip, HiPlusCircle } from "react-icons/hi";
import api from "../../api";

const InstitutionDevices = () => {
  const [devices, setDevices] = useState([]);
  const [status, setStatus] = useState("");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [message, setMessage] = useState("");

  const fetchDevices = async () => {
    try {
      const res = await api.get("/institution/rfid/devices");
      setDevices(res.data.deviceIds || []);
      setStatus(res.data.status || "");
      setSubscriptionEndDate(res.data.subscriptionEndDate || "");
    } catch (error) {
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestNewDevice = async () => {
    setRequesting(true);
    setMessage("");

    try {
      await api.post("/institution/rfid/request-device");
      setMessage("✅ Device request sent successfully.");
      fetchDevices();
    } catch (err) {
      console.error("Device request failed:", err);
      setMessage("❌ Failed to request a new device. Please try again.");
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border border-gray-200 shadow-xl rounded-3xl p-8 relative overflow-hidden">
        {/* Title + Action */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-3 text-gray-800">
            <HiOutlineChip className="text-4xl text-blue-600" />
            <h1 className="text-3xl font-extrabold tracking-tight">
              Assigned RFID Devices
            </h1>
          </div>

          <button
            onClick={requestNewDevice}
            disabled={requesting}
            aria-disabled={requesting}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all text-sm shadow-md border focus:outline-none ${
              requesting
                ? "bg-gray-300 text-gray-600 cursor-not-allowed border-gray-300"
                : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-blue-700"
            }`}
          >
            <HiPlusCircle className="text-lg" />
            {requesting ? "Requesting..." : "Request New Device"}
          </button>
        </div>

        {/* Table or State */}
        {loading ? (
          <div className="flex justify-center py-10" aria-live="polite">
            <div className="text-blue-500 text-lg font-medium animate-pulse">
              Fetching devices...
            </div>
          </div>
        ) : devices.length > 0 ? (
          <div className="overflow-x-auto border border-gray-100 rounded-2xl scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
            <table className="min-w-full bg-white text-sm md:text-base">
              <thead className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-600 font-semibold">
                <tr>
                  <th className="px-6 py-4 text-left">Device ID</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">
                    {status === "expired" ? "Expired On" : "Valid Until"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {devices.map((deviceId) => (
                  <tr
                    key={deviceId}
                    className="hover:bg-blue-50 transition-all duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {deviceId}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold capitalize ${
                        status === "expired" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {status}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {subscriptionEndDate.split(",")[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12" aria-live="polite">
            <p className="text-gray-500 text-lg font-medium">
              No devices assigned yet.
            </p>
          </div>
        )}
        {/* Status Message */}
        {message && (
          <div className="mt-6 text-center">
            <div
              className={`inline-block px-4 py-2 rounded-xl text-sm font-medium ${
                message.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstitutionDevices;
