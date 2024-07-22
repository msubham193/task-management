import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../context/AuthContext";
import { register } from "../../api/api";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { validateSignUp } from "../../utils/formValidation"; // Import the validation function

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext) as AuthContextType;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (
      !validateSignUp(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      )
    ) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const data = await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      signup(data.token);
      toast.success("Registration successful");
      navigate("/signin");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex relative justify-center items-center min-h-screen bg-white">
      <div className="absolute top-20 max-w-md w-[80%] sm:w-full flex flex-col">
        <h2 className="text-3xl text-left font-bold mb-5 text-blue-600">
          Signup
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 disabled:bg-blue-400 flex items-center justify-center text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
            >
              {loading ? <Loader className="animate-spin" /> : "Signup"}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-blue-600 hover:underline font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signin");
                }}
              >
                Login
              </a>
            </p>
            <div className="w-full flex justify-center">
              <button
                type="button"
                className="w-fit items-center bg-blue-600 border text-white border-gray-300 py-2 px-4 rounded-md shadow hover:bg-blue-700 mt-2"
              >
                Signup with <span className="font-semibold">Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
