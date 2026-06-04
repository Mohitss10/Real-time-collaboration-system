import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});


// REGISTER
export const registerUser = async (userData) => {
  return API.post("/auth/register", userData);
};


// LOGIN
export const loginUser = async (userData) => {
  return API.post("/auth/login", userData);
};