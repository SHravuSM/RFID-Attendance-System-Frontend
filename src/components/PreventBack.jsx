// src/components/PreventBack.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreventBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      // Prevent back nav on admin or institution dashboard
      if (
        location.pathname.startsWith("/ADMIN") ||
        // location.pathname.startsWith("/ ") ||
        location.pathname.startsWith("/Institution")
      ) {
        navigate(1); // Push forward in the stack
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [location.pathname, navigate]);

  return null;
};

export default PreventBack;
