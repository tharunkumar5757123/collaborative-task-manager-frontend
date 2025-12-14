import { useEffect } from "react";
import { socket } from "../socket";
import { useQueryClient } from "@tanstack/react-query";

export const useTaskSocket = () => {
  const qc = useQueryClient();

  useEffect(() => {
    socket.on("task:created", () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:updated", () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    socket.on("task:deleted", () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
      socket.off("task:deleted");
    };
  }, [qc]);
};
