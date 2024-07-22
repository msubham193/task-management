import React, { useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/authpages/SignUp";
import SignIn from "./pages/authpages/SignIn";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import User from "./pages/User";

// Protected Route Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <SignIn />;
};

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/signup" && currentPath !== "/signin") {
        navigate("/signin");
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <main>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="/user-details"
          element={<ProtectedRoute element={<User />} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </main>
  );
}

export default App;
