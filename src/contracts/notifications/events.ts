export const eventsNotifications = {
  leadAssigned: "lead.assigned",
  leadClosed: "lead.closed",
  leadStatusChanged: "lead.status-changed",
  taskCreated: "task.created",
  taskDeleted: "task.deleted",
  notificationCreated: "notifications.created",
} as const;
export type EventsNotifications =
  (typeof eventsNotifications)[keyof typeof eventsNotifications];
