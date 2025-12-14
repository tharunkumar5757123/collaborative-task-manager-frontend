import API from "./axios";

/* =======================
   TYPES
======================= */
export type TaskStatus =
  | "To Do"
  | "In Progress"
  | "Review"
  | "Completed";

export type TaskPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignedToId?: string;
};

/* =======================
   API FUNCTIONS
======================= */
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (
  data: Partial<Task>
) => {
  const res = await API.post("/tasks", data);
  return res.data;
};

export const updateTask = async (
  id: string,
  data: Partial<Task>
) => {
  const res = await API.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string) => {
  await API.delete(`/tasks/${id}`);
};
