import type { eventsNotifications } from "./notifications/events";
import type { NotificationsEvents } from "./notifications/notifications.types";
import type { TasksEvents } from "./tasks/tasks.types";

export const CRM_EVENTS_EXCHANGE = "crm.events";
export type CrmEvents = Omit<
  NotificationsEvents,
  typeof eventsNotifications.notificationCreated
> &
  TasksEvents;

export type CrmEventName = keyof CrmEvents & string;
