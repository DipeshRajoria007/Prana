import axios from "axios";
const API_URL = "http://localhost:8000/api/login";

const login = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  localStorage.removeItem("user");
};
const authService = {
  login,
  logout,
};
export default authService;
