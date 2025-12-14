import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useTaskSocket } from "../hooks/useTaskSocket";
import NotificationBell from "../components/NotificationBell";

export default function Dashboard() {
  useTaskSocket(); // 👈 real-time enabled

 return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <NotificationBell />
      </div>
      {/* Tasks */}
      <TaskForm />
      <TaskList />
    </div>
  );
}

     