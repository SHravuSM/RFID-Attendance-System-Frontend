import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
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
