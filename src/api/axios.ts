import axios from "axios";

/**
 * Axios instance for API calls
 * - withCredentials: allows HttpOnly JWT cookies
 * - baseURL: backend API base path
 */
const API = axios.create({
  baseURL: "https://collaborative-task-manager-backend-zucz.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
