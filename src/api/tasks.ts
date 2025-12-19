import API from "./axios";

/* ===================== TYPES ===================== */
export type TaskStatus = "To Do" | "In Progress" | "Review" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High" | "Urgent";

// src/api/tasks.ts (update Task type)
export type Task = {
  _id: string;
  title: string;
  description?: string;  // optional
  dueDate?: string;      // optional
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "To Do" | "In Progress" | "Review" | "Completed";
  creatorId: string;
  assignedToId?: string;
  createdAt?: string;
  updatedAt?: string;
};


/* ===================== API FUNCTIONS ===================== */
export const fetchTasks = async (): Promise<Task[]> => {
  const res = await API.get("/tasks");
  return res.data;
};

export const createTask = async (data: Partial<Task>): Promise<Task> => {
  const res = await API.post("/tasks", data);
  return res.data;
};

export const updateTask = async (id: string, data: Partial<Task>): Promise<Task> => {
  const res = await API.patch(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await API.delete(`/tasks/${id}`);
};
