import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { taskSchema } from "../validation/task.schema";
import { useCreateTask } from "../hooks/useTasks";
import type { Task } from "../api/tasks";

type FormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: { priority: "Medium" },
  });

  const { mutate, isPending } = useCreateTask();

  const onSubmit = (data: FormData) => {
    let dueDateIso: string | undefined = undefined;

    if (data.dueDate) {
      const formatted =
        data.dueDate.length === 16 ? data.dueDate + ":00" : data.dueDate;
      const date = new Date(formatted);
      if (!isNaN(date.getTime())) {
        dueDateIso = date.toISOString();
      }
    }

    const payload: Partial<Task> = {
      title: data.title,
      description: data.description || undefined,
      dueDate: dueDateIso,
      priority: data.priority,
      status: "To Do",
      assignedToId: data.assignedToId || undefined,
    };

    mutate(payload, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow space-y-3"
    >
      <h2 className="font-semibold text-lg">Create Task</h2>

      <input
        {...register("title")}
        placeholder="Task title"
        className="border p-2 w-full"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <textarea
        {...register("description")}
        placeholder="Description"
        className="border p-2 w-full"
      />

      <input
        type="datetime-local"
        {...register("dueDate")}
        className="border p-2 w-full"
      />
      {errors.dueDate && (
        <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
      )}

      <select {...register("priority")} className="border p-2 w-full">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Urgent">Urgent</option>
      </select>

      <input
        {...register("assignedToId")}
        placeholder="Assign to User ID"
        className="border p-2 w-full"
      />
      {errors.assignedToId && (
        <p className="text-red-500 text-sm">Assigned user is required</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white py-2 rounded w-full"
      >
        {isPending ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
