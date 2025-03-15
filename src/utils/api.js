const API_BASE_URL = "https://watchmovies-backend.onrender.com";

export const registerUser = async (userData) => {
  console.log("Registering user with data:", userData);
  console.log("POST Request to:", `${API_BASE_URL}/signup`);

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data; // { user, token }
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: error.message };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    // ✅ Store token and user data in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data; // { user, token }
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: error.message };
  }
};
