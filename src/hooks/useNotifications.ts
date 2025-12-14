import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../api/axios";
import { socket } from "../socket";

export const useNotifications = () => {
  const queryClient = useQueryClient();

  // 📥 Fetch from DB
  const query = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await API.get("/notifications");
      return res.data;
    },
  });

  // ✅ Mark one as read
  const markOne = useMutation({
    mutationFn: (id: string) =>
      API.patch(`/notifications/${id}/read`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  // ✅ Mark all as read
  const markAll = useMutation({
    mutationFn: () => API.patch("/notifications/read-all"),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  // ⚡ Real-time updates
  useEffect(() => {
    socket.on("notification:new", () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.off("notification:new");
    };
  }, [queryClient]);

  return {
    notifications: query.data || [],
    isLoading: query.isLoading,
    markOne,
    markAll,
  };
};
