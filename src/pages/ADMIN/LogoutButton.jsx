import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens or any sensitive data
    localStorage.clear();
    sessionStorage.clear();

    // Navigate to home and remove history stack
    navigate("/", { replace: true });
    // window.location.reload();
    // window.close();
  };

  return (
    <div className="p-6 border-t border-gray-200">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
