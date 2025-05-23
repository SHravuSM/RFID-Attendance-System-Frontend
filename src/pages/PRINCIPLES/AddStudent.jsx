// import Loader from "./Loader";
import React, { useEffect, useReducer, useState } from "react";
import Loader from "./Loader1";
import api from "../../api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react"; // assuming you're using lucide-react

export default function IAddStudent() {
  const [PendingUser, setPendingUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const { deviceId } = useParams();
  const [formData, setFormData] = useState({});
  const [count, setCount] = useState(1);

  const fetchClasses = async () => {
    try {
      const res = await api.get(`/institution/classes/classnames`);
      setClasses(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching classes:", err);
    }
  };
  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await api.get(
          `/institution/rfid/unregistered?deviceId=${deviceId}`
        );
        const pendingUser = res.data.pendingUser;

        if (pendingUser?.rfid) {
          console.log(pendingUser);
          setPendingUser(pendingUser);
          clearInterval(interval);
          setTimeout(() => setShowModal(true), 1000);
        }
      } catch (err) {
        console.error("Error fetching RFID:", err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [deviceId, count]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDelete = async (Id) => {
    const res = await api.delete(`/rfid/delete/${Id}`);
    setShowModal(false);
    setPendingUser(null);
    setCount((pre) => pre + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return alert("Please select a role!");

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        rfid: PendingUser.rfid,
        institutionCode: PendingUser.institutionCode,
        institutionName: PendingUser.institutionName,
        role: selectedRole,
      };

      const res = await api.post(`/institution/rfid/register`, payload);
      if (res.data.success) {
        const { password } = res.data;
        const { name } = res.data.user;

        if (selectedRole === "teacher") {
          alert(
            `Registered successfully, and your password is ${password} for the Id ${name}`
          );
        } else {
          alert(`Registered successfully, ${name}`);
        }

        setShowModal(false);
        setSelectedRole("");
        setFormData({});
        setPendingUser(null);
      } else {
        alert("Failed to register.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Error submitting data.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center h-[80vh] bg-gray-100">
      <h2 className="text-3xl font-bold mb-4 mt-5 text-gray-800">{deviceId}</h2>

      {PendingUser?.rfid ? (
        <div className="relative bg-green-100 text-green-800 px-6 py-4 pr-16 rounded-xl shadow-md flex items-center gap-4">
          {/* Status Icon */}
          <div className="text-3xl">✅</div>

          {/* RFID Info */}
          <div className="flex flex-col">
            <p className="font-semibold leading-tight">RFID Detected</p>
            <p className="font-mono text-sm text-green-900">
              {PendingUser.rfid}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-medium mb-5 text-gray-700">
            Waiting for RFID scan...
          </p>
          <Loader />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] md:w-[400px] relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Register Details
            </h3>
            {/* Red Dustbin Icon - Delete */}
            <button
              className="absolute top-4 right-[6px] text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full transition-colors duration-200"
              onClick={() => {
                handleDelete(PendingUser.rfid);
                // Handle delete logic here
              }}
              aria-label="Delete"
              title="Delete"
            >
              <Trash2 size={24} />
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Select Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => {
                    setSelectedRole(e.target.value);
                    setFormData({});
                  }}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select</option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="staff">Staff</option>
                </select>
              </div>

              {/* RFID Display */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  RFID UID
                </label>
                <input
                  type="text"
                  value={PendingUser.rfid}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                />
              </div>

              {/* Dynamic Inputs */}
              {selectedRole === "student" && (
                <>
                  <Input
                    label="Student Name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                  <select
                    name="className"
                    value={formData.className || ""}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls, idx) => (
                      <option key={cls.className} value={cls.className}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                  <Input
                    label="Roll Number"
                    name="rollNumber"
                    value={formData.rollNumber || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Parent Name"
                    name="parentName"
                    value={formData.parentName || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Parent Contact"
                    name="parentContactNumber"
                    value={formData.parentContactNumber || ""}
                    onChange={handleChange}
                  />
                </>
              )}

              {selectedRole === "teacher" && (
                <>
                  <Input
                    label="Teacher Name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                  <select
                    name="className"
                    value={formData.className || ""}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls, idx) => (
                      <option key={cls.className} value={cls.className}>
                        {cls.className}
                      </option>
                    ))}
                  </select>
                  <Input
                    label="Email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber || ""}
                    onChange={handleChange}
                  />
                </>
              )}

              {selectedRole === "staff" && (
                <>
                  <Input
                    label="Staff Name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Designation"
                    name="designation"
                    value={formData.designation || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Department"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleChange}
                  />
                  <Input
                    label="Contact Number"
                    name="contactNumber"
                    value={formData.contactNumber || ""}
                    onChange={handleChange}
                  />
                </>
              )}

              <div className="flex justify-end gap-3 mt-4">
                {/* <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button> */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Input Component
const Input = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 rounded-lg px-3 py-2"
    />
  </div>
);
