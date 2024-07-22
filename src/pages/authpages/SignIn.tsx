import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { googleAuth, login } from "../../api/api";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { validateSignIn } from "../../utils/formValidation"; // Import the validation function

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginContext } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!validateSignIn(email, password)) return;

    try {
      setLoading(true);
      const data = await login(email, password);
      loginContext(data.token, data.user);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleAuth();
    } catch (error) {
      setLoading(false);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="flex relative justify-center items-center min-h-screen bg-white">
      <div className="absolute top-20 max-w-md w-[80%] sm:w-full flex flex-col">
        <h2 className="text-3xl text-left font-bold mb-5 text-blue-600">
          Login
        </h2>
        <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-600">
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border-gray-500 border rounded-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 disabled:bg-blue-400 flex items-center justify-center text-white py-2 px-4 rounded-md shadow hover:bg-blue-700"
            >
              {loading ? <Loader className="animate-spin" /> : "Login"}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline font-bold"
                onClick={() => navigate("/signup")}
              >
                Signup
              </a>
            </p>

            <div className="w-full flex justify-center">
              <button
                type="button"
                className="w-fit items-center bg-blue-600 border text-white border-gray-300 py-2 px-4 rounded-md shadow hover:bg-blue-700 mt-2"
                onClick={handleGoogleLogin}
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

export default SignIn;
