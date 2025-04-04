import axios from "axios";

export const registerUser = async (registerData) => {
  try {
    const response = await axios.post("http://localhost:9090/auth/register", registerData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data); // ✅ Log error details
    return { error: error.response?.data?.error || "Registration failed" }; // ✅ Return correct error
  }
};

export const loginUser = async (registerData) => {
  try {
    const response = await axios.post("http://localhost:9090/auth/login", registerData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error.response?.data); // ✅ Log error details
    return { error: error.response?.data?.message || "Login failed" }; // ✅ Return correct error
  }
}