import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../utils/api";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // NEW: Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.username && !formData.email && !formData.password && !formData.confirmPassword) {
      setError("Fill the form to create an account");
      return;
    }

    if (!formData.username) {
      setError("Please provide a username");
      return;
    }

    if (!formData.email) {
      setError("Email is required!");
      return;
    }
    if (!formData.password && !formData.confirmPassword) {
      setError("Please provide a password!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    const data = await registerUser({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (data?.user) {
      alert("Signup successful! Redirecting...");
      navigate("/signin");
    } else {
      setError(data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-teal-400 text-center mb-4">
          Create an Account
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 rounded-md bg-gray-700 text-white"
            value={formData.username}
            onChange={handleChange}
            
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-700 text-white"
            value={formData.email}
            onChange={handleChange}
            
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-700 text-white"
            value={formData.password}
            onChange={handleChange}
            
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md bg-gray-700 text-white"
            value={formData.confirmPassword}
            onChange={handleChange}
            
          />
          <button
            type="submit"
            className="w-full bg-teal-400 py-3 rounded-md font-bold disabled:opacity-50"
            disabled={loading} // Disables button while loading
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-teal-400 ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
