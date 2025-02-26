import React, { useState } from "react";
import "./Login.css"; // Ensure styles include animations for slide-in/out
import axios from "axios";
import { BASE_URL } from "@/App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage, storeTokens } from "../LocalStorage";

const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("12345678");
  const [confirmPassword, setConfirmPassword] = useState<string>("12345678");
  const [username, setUsername] = useState<string>("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    username?: string;
  }>({});
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null); // New state for logged-in user
  const navigate = useNavigate();
  const toggleModal = () => {
    if (isModalOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsAnimating(false);
      }, 500); // Duration should match your CSS animation
    } else {
      setIsModalOpen(true);
    }
  };

  const loginUser = async () => {
    const formData = {
      email,
      password,
    };
    // if (email === "admin@gmail.com" && password === "12345678") {
    //     navigate('/adminhome'); // Navigate to admin home page
    //     toast.success("Admin login successful!"); // Optional: Show success message
    //     return; // Exit the function to prevent further execution
    //   }
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      if (response.data?.message) {
        if (response.data?.role === "admin") {
          navigate("/adminhome");
          toast.success("Admin login successful!");
          return;
        }
        if (response.data?.role === "user") {
          navigate("/");
          storeTokens(response.data.accessToken);
          localStorage.setItem("loggedInUser", email);
          localStorage.setItem("userId", response.data._id);

            // toast.success("Login successful!");
          setLoggedInUser(email); // Also update state

          return;
        }
        toast.success(response.data.message);
      } else if (response.data?.status === 400) {
        toast.warn(response.data.message);
      }

      console.log("Login successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message || "An error occurred during login."
        );
        console.error("Response error:", error.response.data);
      } else {
        toast.error("Network or unexpected error occurred.");
        console.error("Network or unexpected error:", error);
      }
    }
  };

  const registerUser = async () => {
    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.message) {
        toast.success(response.data.message);
      } else if (response.data?.status === 400) {
        toast.warn(response.data.message);
      }

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          error.response.data.message ||
            "An error occurred during registration."
        );
        console.error("Response error:", error.response.data);
      } else {
        toast.error("Network or unexpected error occurred.");
        console.error("Network or unexpected error:", error);
      }
    }
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      username?: string;
    } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (activeTab === "signup") {
      if (!username) {
        newErrors.username = "Username is required";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      if (activeTab === "signup") {
        await registerUser();
      }
      if (activeTab === "login") {
        await loginUser();
      }
      toggleModal();
    }
  };

  return (
    <div>
      {loggedInUser ? (
        <span>{loggedInUser}</span>
      ) : (
        <button onClick={toggleModal}>
          {activeTab === "login" ? "Login" : "Sign Up"}
        </button>
      )}

      {isModalOpen && (
        <div className="fixed top-60 inset-0 flex items-center justify-center bg-black bg-opacity-75">
          <div
            className={`bg-white p-6 rounded shadow-lg w-96 ${
              isAnimating ? "animate-slide-out" : "animate-slide-in"
            }`}
          >
            <div className="mb-4 flex border-b border-gray-300">
              <button
                className={`w-1/2 py-2 ${
                  activeTab === "login"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabChange("login")}
              >
                Login
              </button>
              <button
                className={`w-1/2 py-2 ${
                  activeTab === "signup"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabChange("signup")}
              >
                Sign Up
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {activeTab === "signup" && (
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-1">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm">{errors.username}</p>
                  )}
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              {activeTab === "signup" && (
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block mb-1">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {activeTab === "login" ? "Login" : "Sign Up"}
              </button>
            </form>
            <button
              onClick={toggleModal}
              className="mt-4 text-red-500 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
