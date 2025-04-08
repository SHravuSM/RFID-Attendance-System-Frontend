import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext"; // import AuthProvider
const Root = () => (
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
