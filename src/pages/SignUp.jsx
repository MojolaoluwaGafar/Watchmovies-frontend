import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../utils/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (data?.user) {
        alert("Signup successful! Redirecting...");
        navigate("/signin");
      } else {
        setError(data?.message || "Signup failed. Try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-3xl mb-6 text-teal-200 font-bold">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-teal-500"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-600 hover:border-2 hover:border-teal-500 text-white font-bold py-3 rounded-md transition-transform transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-teal-400 ml-1 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
