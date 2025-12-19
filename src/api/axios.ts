import axios from "axios";

const API = axios.create({
  baseURL: "https://collaborative-task-manager-backend-hmdk.onrender.com/api/v1",
  withCredentials: true,
});

export default API;
