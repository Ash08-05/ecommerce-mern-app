import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false); // ✅ added

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (loading) return; // ✅ prevent multiple clicks

    // ✅ basic validation
    if (!email.trim() || !password.trim()) {
      return toast.error("Email and Password are required");
    }

    if (currentState === "Sign Up" && !name.trim()) {
      return toast.error("Name is required");
    }

    try {
      setLoading(true);

      let response;

      if (currentState === "Login") {
        response = await axios.post(
          backendUrl + "/api/user/login",
          {
            email: email.trim(),
            password: password.trim(),
          }
        );
      } else {
        response = await axios.post(
          backendUrl + "/api/user/register",
          {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          }
        );
      }

      if (response.data.success) {
        toast.success(response.data.message || "Success!");

        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // ✅ clear fields
        setEmail("");
        setPassword("");
        setName("");

        navigate("/");
      } else {
        toast.error(response.data.message || "Invalid credentials");
      }

    } catch (error) {

      // ✅ better error handling
      if (!error.response) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(
          error.response?.data?.message || "Something went wrong"
        );
      }

      console.log(error);

    } finally {
      setLoading(false); // ✅ always stop loading
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]); // ✅ added navigate

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{currentState}</p>
          <hr className="w-12 mx-auto mt-2 border-gray-900" />
        </div>

        {/* Name (Signup only) */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
            focus:outline-none focus:border-gray-900"
            placeholder="Name"
            required
          />
        )}

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus // ✅ better UX
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
          focus:outline-none focus:border-gray-900"
          placeholder="Email"
          required
        />

        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
          focus:outline-none focus:border-gray-900"
          placeholder="Password"
          required
        />

        {/* Actions */}
        <div className="flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-black transition">
            Forgot Password?
          </p>

          {currentState === "Login" ? (
            <p
              onClick={() => setCurrentState("Sign Up")}
              className="cursor-pointer hover:text-black transition font-medium"
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState("Login")}
              className="cursor-pointer hover:text-black transition font-medium"
            >
              Login Here
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading} // ✅ disable while loading
          className="w-full py-3 bg-gray-900 text-white rounded-lg
          hover:bg-black transition font-medium disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : currentState === "Login"
            ? "Sign In"
            : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Login;
