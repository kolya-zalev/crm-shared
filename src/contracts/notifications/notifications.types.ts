import { Actor } from "../actor";
import { messagesNotifications } from "./messages";
import { eventsNotifications } from "./events";

export const notificationTypes = {
  leadAssigned: "lead_assigned",
  leadAssignedByMember: "lead_assigned_by_member",
  leadClosed: "lead_closed",
  leadStatusChanged: "lead_status_changed",
  taskCreated: "task_created",
  taskDeleted: "task_deleted",
} as const;

export type NotificationType =
  (typeof notificationTypes)[keyof typeof notificationTypes];

export type NotificationDto = {
  id: string;
  type: string;
  message: string;
  leadId: string | null;
  actorName: string;
  isRead: boolean;
  createdAt: string;
};

export type NotificationListDto = {
  items: NotificationDto[];
  unreadCount: number;
};

export type NotificationsUserPayload = { userId: string };
export type NotificationsMarkAsReadPayload = { userId: string; id: string };

type WithLeaders = { leaderIds: string[] };

export type LeadAssignedEvent = WithLeaders & {
  actor: Actor;
  assignedId: string;
  assignedName: string;
  leadId: string;
  leadName: string;
};
export type LeadClosedEvent = WithLeaders & {
  actor: Actor;
  leadId: string;
  leadName: string;
  status: string;
};
export type LeadStatusChangedEvent = LeadClosedEvent;
export type TaskCreatedEvent = WithLeaders & {
  actor: Actor;
  leadId: string;
  leadName: string;
  taskTitle: string;
};
export type TaskDeletedEvent = WithLeaders & {
  actor: Actor;
  leadId: string;
  leadName: string;
  assignTask: string;
};
export type NotificationCreatedEvent = {
  userId: string;
  notification: NotificationDto;
};

export type NotificationsContract = {
  [messagesNotifications.notificationList]: {
    payload: NotificationsUserPayload;
    response: NotificationListDto;
  };
  [messagesNotifications.notificationsMarkAsRead]: {
    payload: NotificationsMarkAsReadPayload;
    response: NotificationListDto;
  };
  [messagesNotifications.notificationsMarkAllAsRead]: {
    payload: NotificationsUserPayload;
    response: NotificationListDto;
  };
  [messagesNotifications.notificationsDeleteAll]: {
    payload: NotificationsUserPayload;
    response: NotificationListDto;
  };
};

export type NotificationsEvents = {
  [eventsNotifications.leadAssigned]: LeadAssignedEvent;
  [eventsNotifications.leadClosed]: LeadClosedEvent;
  [eventsNotifications.leadStatusChanged]: LeadStatusChangedEvent;
  [eventsNotifications.taskCreated]: TaskCreatedEvent;
  [eventsNotifications.taskDeleted]: TaskDeletedEvent;
  [eventsNotifications.notificationCreated]: NotificationCreatedEvent;
};


