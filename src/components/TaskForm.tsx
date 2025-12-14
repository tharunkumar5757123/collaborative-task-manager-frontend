import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../validation/task.schema";
import { useCreateTask } from "../hooks/useTasks";

type FormData = {
  title: string;
  description?: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  assignedToId?: string;
};

export default function TaskForm() {
  const { register, handleSubmit, reset, formState } =
    useForm<FormData>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        priority: "Medium",
      },
    });

  const { mutate, isPending } = useCreateTask();

  const onSubmit = (data: FormData) => {
    mutate(
      {
        ...data,
        status: "To Do",
      },
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-4 rounded shadow mb-4 space-y-2"
    >
      <h2 className="font-semibold">Create Task</h2>

      <input
        {...register("title")}
        placeholder="Task title"
        className="border p-2 w-full"
      />
      {formState.errors.title && (
        <p className="text-red-500 text-sm">
          Title is required
        </p>
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

      <select
        {...register("priority")}
        className="border p-2 w-full"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Urgent</option>
      </select>

      {/* Assignment dropdown (optional – can wire later) */}
      <input
        {...register("assignedToId")}
        placeholder="Assign to user ID (optional)"
        className="border p-2 w-full"
      />

      <button
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {isPending ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
