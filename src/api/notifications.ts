import API from "./axios";

export const fetchNotifications = async () => {
  const { data } = await API.get("/notifications");
  return data;
};

export const markRead = async (id: string) => {
  await API.patch(`/notifications/${id}/read`);
};

export const markAllRead = async () => {
  await API.patch("/notifications/read-all");
};
