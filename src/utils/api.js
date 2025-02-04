const API_BASE_URL = "http://localhost:5000/api/auth"; // Update if backend URL changes

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
