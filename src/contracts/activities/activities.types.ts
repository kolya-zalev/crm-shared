import type { ActivityDto, LeadIdPayload } from "../leads/leads.types";
import type { activitiesMessages } from "./messages";

export type ActivitiesContract = {
  [activitiesMessages.activitiesFindByLead]: {
    payload: LeadIdPayload;
    response: ActivityDto[];
  };
};

export const activityTypes = {
  leadCreated: "lead_created",
  statusChanged: "status_changed",
  assigned: "assigned",
  leadUpdated: "lead_updated",
  noteAdded: "note_added",
  noteDeleted: "note_deleted",
} as const;

export type ActivityType = (typeof activityTypes)[keyof typeof activityTypes];
