import axios from "axios";

export const getCurrentUser = async () => {
  const { data } = await axios.get("http://localhost:5000/api/auth/current-user", {
    withCredentials: true,
  });
  return data;
};

export const logout = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/logout", {}, {
      withCredentials: true, // Send cookies with the request
    });
    console.log(response.data); // Handle success
  } catch (error) {
    console.error("Logout error:", error.response || error.message); // Log the error
  }
};
