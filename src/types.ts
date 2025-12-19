export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string; // or Date if you parse it
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "To Do" | "In Progress" | "Review" | "Completed";
  creatorId: string;
  assignedToId?: string;
  createdAt?: string;
  updatedAt?: string;
}
