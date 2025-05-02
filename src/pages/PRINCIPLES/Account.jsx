// import React, { useEffect, useState } from "react";
// import { LogOut, Settings, Mail, User, School } from "lucide-react";
// import api from "../../api";
// import { useAuth } from "../../context/AuthContext";

// export default function IAccount() {
//   const [data, setData] = useState([]);
//   const { logout } = useAuth();
//   // const { data } = useAuth();
//   const user = {
//     name: `Mr. ${data.principalName}`,
//     institutionCode: `${data.institutionCode}`,
//     email: data.email,
//     role: "Principal",
//     institution: data.institutionName,
//   };

//   const Institution = async () => {
//     const res = await api.get("institution/account");
//     const data = res.data[0];
//     // console.log(data);
//     setData(data);
//   };

//   useEffect(() => {
//     Institution();
//   }, []);

//   const [showModal, setShowModal] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function changePassword() {
//     if (!currentPassword || !newPassword) {
//       setError("Both fields are required.");
//       setMessage("");
//       return;
//     }
//     if (newPassword.length < 6) {
//       setError("New password must be at least 6 characters.");
//       setMessage("");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await api.post(
//         "/institution/institutions/change-password",
//         { currentPassword, newPassword }
//       );
//       setMessage(response.data.message);
//       setError("");
//       setTimeout(() => {
//         setShowModal(false);
//         setCurrentPassword("");
//         setNewPassword("");
//         setMessage("");
//       }, 2000);
//     } catch (err) {
//       const msg = err.response?.data?.error || "Failed to change password.";
//       setError(msg);
//       setMessage("");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-8">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
//           {user.name[0]}
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//           <p className="text-gray-500 text-sm">{user.institutionCode}</p>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
//         <div className="flex items-center gap-3">
//           <Mail className="text-blue-500" size={18} />
//           <p className="text-gray-700 text-sm">{user.email}</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <User className="text-green-500" size={18} />
//           <p className="text-gray-700 text-sm">Role: {user.role}</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <School className="text-purple-500" size={18} />
//           <p className="text-gray-700 text-sm">
//             institution: {user.institution}
//           </p>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex flex-col md:flex-row gap-4">
//         <button
//           onClick={() => setShowModal(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
//         >
//           <Settings size={18} /> Change Password
//         </button>
//         <button
//           onClick={logout}
//           className="flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2 rounded-lg border hover:bg-red-200 transition"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>

//       {/* Change Password Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4 shadow-lg">
//             <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
//             <input
//               type="password"
//               placeholder="Current Password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="w-full border px-4 py-2 rounded-lg"
//             />

//             {message && <p className="text-green-600 text-sm">{message}</p>}
//             {error && <p className="text-red-600 text-sm">{error}</p>}

//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={changePassword}
//                 disabled={loading}
//                 className={`px-4 py-2 text-sm ${
//                   loading
//                     ? "bg-blue-300 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 } text-white rounded-lg`}
//               >
//                 {loading ? "Updating..." : "Update"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { LogOut, Settings, Mail, User, School } from "lucide-react";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";

export default function IAccount() {
  const [data, setData] = useState([]);
  const { logout } = useAuth();

  const user = {
    name: `Mr/Mrs. ${data.principalName}`,
    institutionCode: `${data.institutionCode}`,
    email: data.email,
    role: "Principal",
    institution: data.institutionName,
  };

  const Institution = async () => {
    const res = await api.get("institution/account");
    const data = res.data[0];
    setData(data);
  };

  useEffect(() => {
    Institution();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function changePassword() {
    if (!currentPassword || !newPassword) {
      setError("Both fields are required.");
      setMessage("");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      setMessage("");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(
        "/institution/institutions/change-password",
        { currentPassword, newPassword }
      );
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        setShowModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setMessage("");
      }, 500);
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to change password.";
      setError(msg);
      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold shadow-md">
          {user.name[0]}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500 text-sm font-medium">
            {user.institutionCode}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-5">
        <div className="flex items-center gap-3">
          <Mail className="text-blue-500" size={20} />
          <p className="text-gray-700">{user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <User className="text-green-500" size={20} />
          <p className="text-gray-700">Role: {user.role}</p>
        </div>
        <div className="flex items-center gap-3">
          <School className="text-purple-500" size={20} />
          <p className="text-gray-700">Institution: {user.institution}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow hover:bg-blue-700 transition-all"
        >
          <Settings size={18} /> Change Password
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-red-100 text-red-600 px-5 py-2.5 rounded-xl border border-red-200 hover:bg-red-200 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full space-y-4 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Change Password
            </h3>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={changePassword}
                disabled={loading}
                className={`px-4 py-2 text-sm text-white rounded-lg ${
                  loading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
