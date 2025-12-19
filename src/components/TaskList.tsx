import React from "react";
import { useTasks, useUpdateTask, useDeleteTask } from "../hooks/useTasks";
import type { Task } from "../api/tasks";

const statuses: Task["status"][] = ["To Do", "In Progress", "Review", "Completed"];
const priorities: Task["priority"][] = ["Low", "Medium", "High", "Urgent"];

export default function TaskList() {
  const { data: tasks, isLoading } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  if (isLoading) return <p>Loading tasks...</p>;

  return (
    <div className="space-y-3">
      {tasks?.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between">
            <h3 className="font-semibold">{task.title}</h3>
            <button onClick={() => deleteTask.mutate(task._id)} className="text-red-600 text-sm">
              Delete
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-2">{task.description}</p>

          <div className="flex gap-3">
            <select
              value={task.status}
              onChange={(e) => updateTask.mutate({ id: task._id, data: { status: e.target.value as Task["status"] } })}
              className="border p-1 rounded"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={task.priority}
              onChange={(e) => updateTask.mutate({ id: task._id, data: { priority: e.target.value as Task["priority"] } })}
              className="border p-1 rounded"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
