import React, { useEffect, useState } from "react";
import api from "../../api";

export default function AssignDevice() {
  const [institutions, setInstitutions] = useState([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const res = await api.get(`/admin/institutions`);
        setInstitutions(res.data || []);
      } catch (err) {
        console.error("Error fetching institutions:", err);
      }
    };

    fetchInstitutions();
  }, []);

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedInstitution || !deviceId) return;

    setLoading(true);
    setFeedback(null);
    try {
      const res = await api.post(`/admin/institutions/assign-device`, {
        institutionCode: selectedInstitution,
        deviceId,
      });

      setFeedback({ type: "success", message: res.data.message });
      setDeviceId("");
    } catch (err) {
      console.error(err);
      setFeedback({
        type: "error",
        message: err?.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Assign RFID Device</h1>
      <form onSubmit={handleAssign} className="space-y-4">
        <div>
          <label htmlFor="institution" className="block font-medium">
            Select Institution
          </label>
          <select
            id="institution"
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select --</option>
            {institutions.map((inst) => (
              <option key={inst._id} value={inst.institutionCode}>
                {inst.institutionName} ({inst.institutionCode})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="deviceId" className="block font-medium">
            Device ID
          </label>
          <input
            id="deviceId"
            type="text"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            placeholder="Enter RFID Device ID"
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !selectedInstitution || !deviceId}
          className={`px-4 py-2 rounded-md text-white ${
            loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Assigning..." : "Assign Device"}
        </button>

        {feedback && (
          <p
            className={`mt-2 text-sm ${
              feedback.type === "success" ? "text-green-600" : "text-red-500"
            }`}
          >
            {feedback.message}
          </p>
        )}
      </form>
    </div>
  );
}
