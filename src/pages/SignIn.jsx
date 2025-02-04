import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token in localStorage
      localStorage.setItem("token", data.token);

      // ✅ Redirect to homepage
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-center text-2xl mb-4">Sign In</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white p-2 rounded mt-3"
          >
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
