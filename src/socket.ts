import { io } from "socket.io-client";

export const socket = io("https://collaborative-task-manager-backend-hmdk.onrender.com", {
  withCredentials: true,
  auth: {
    userId: localStorage.getItem("userId"),
  },
});
