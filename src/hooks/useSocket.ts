import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const s: Socket = io("https://collaborative-task-manager-backend-hmdk.onrender.com", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    setSocket(s);

    s.on("connect", () => setConnected(true));
    s.on("disconnect", () => setConnected(false));

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, []);

  return socket;
};
