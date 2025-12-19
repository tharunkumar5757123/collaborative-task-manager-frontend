import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),

  // ✅ MUST be string (HTML input gives string)
  dueDate: z.string().min(1, "Due date is required"),

  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  assignedToId: z.string().min(1, "Assigned user is required"),
});
