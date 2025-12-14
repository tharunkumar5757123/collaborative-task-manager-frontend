import { useNotifications } from "../hooks/useNotifications";

export default function NotificationBell() {
  const { notifications, markOne, markAll } = useNotifications();

  const unreadCount = notifications.filter(
    (n: any) => !n.read
  ).length;

  return (
    <div className="relative">
      <button className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-2 w-72 bg-white shadow rounded">
        <div className="flex justify-between p-2 border-b">
          <span className="font-semibold">Notifications</span>
          <button
            onClick={() => markAll.mutate()}
            className="text-xs text-blue-600"
          >
            Mark all read
          </button>
        </div>

        {notifications.map((n: any) => (
          <div
            key={n._id}
            onClick={() => markOne.mutate(n._id)}
            className={`p-2 border-b text-sm cursor-pointer ${
              n.read ? "text-gray-400" : "font-semibold"
            }`}
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
}
