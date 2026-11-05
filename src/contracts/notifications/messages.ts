export const messagesNotifications = {
  notificationList: "notifications.list",
  notificationsMarkAsRead: "notifications.markAsRead",
  notificationsMarkAllAsRead: "notifications.markAllAsRead",
  notificationsDeleteAll: "notifications.deleteAll",
} as const;

export type MessagesNotifications =
  (typeof messagesNotifications)[keyof typeof messagesNotifications];
