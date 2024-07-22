import { ClipboardList, User } from "lucide-react";
import  { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/user-details");
  };

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <nav className="flex justify-between items-center bg-blue-600 p-4 text-white">
      <div className="header-left">
        <ClipboardList size={25} />
      </div>
      <div className="header-right flex items-center">
        {isAuthenticated ? (
          <>
            <User
              size={25}
              className="mr-4 cursor-pointer"
              onClick={handleUserClick}
            />
            <button
              className="bg-red-500 text-white py-1 px-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className=" bg-white text-blue-800 py-1 px-2 rounded mr-2"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="bg-transparent text-white py-1 px-2 rounded"
              onClick={handleSignupClick}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
