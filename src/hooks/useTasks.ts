import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../api/tasks"; // ✅ type-only import
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { socket } from "../socket";

/* ================= FETCH TASKS ================= */
export const useTasks = () => {
  const queryClient = useQueryClient();

  const query = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    const handleUpdate = () => queryClient.invalidateQueries(["tasks"]);

    socket.on("taskCreated", handleUpdate);
    socket.on("taskUpdated", handleUpdate);
    socket.on("taskDeleted", handleUpdate);

    return () => {
      socket.off("taskCreated", handleUpdate);
      socket.off("taskUpdated", handleUpdate);
      socket.off("taskDeleted", handleUpdate);
    };
  }, [queryClient]);

  return query;
};

/* ================= CREATE TASK ================= */
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, Partial<Task>>({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  });
};

/* ================= UPDATE TASK ================= */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, unknown, { id: string; data: Partial<Task> }>({
    mutationFn: ({ id, data }) => updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(["tasks"]);

      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.map((task) => (task._id === id ? { ...task, ...data } : task))
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) queryClient.setQueryData<Task[]>(["tasks"], context.previous);
    },

    onSettled: () => queryClient.invalidateQueries(["tasks"]),
  });
};

/* ================= DELETE TASK ================= */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, string>({
    mutationFn: deleteTask,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries(["tasks"]);

      const previous = queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old = []) =>
        old.filter((task) => task._id !== id)
      );

      return { previous };
    },

    onError: (_err, _id, context) => {
      if (context?.previous) queryClient.setQueryData<Task[]>(["tasks"], context.previous);
    },

    onSettled: () => queryClient.invalidateQueries(["tasks"]),
  });
};
