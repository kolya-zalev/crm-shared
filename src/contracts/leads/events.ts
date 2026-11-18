import type { Actor } from "../actor";

export const leadsEvents = {
  leadDeleted: "lead.deleted",
  leadCreated: "lead.created",
  leadUpdated: "lead.updated",
  leadUnassigned: "lead.unassigned",
  noteAdded: "note.added",
  noteDeleted: "note.deleted",
} as const;
export type LeadDeletedEvent = {
  leadId: string;
};

export type LeadCreatedEvent = {
  actor: Actor;
  leadId: string;
  leadName: string;
  occurredAt: string;
};

export type LeadUpdatedEvent = {
  actor: Actor;
  leadId: string;
  leadName: string;
  occurredAt: string;
};

export type LeadUnassignedEvent = {
  actor: Actor;
  leadId: string;
  leadName: string;
  occurredAt: string;
  previousAssigneeName: string | null;
};

export type NoteAddedEvent = {
  actor: Actor;
  leadId: string;
  noteId: string;
  occurredAt: string;
};

export type NoteDeletedEvent = {
  actor: Actor;
  leadId: string;
  noteId: string;
  occurredAt: string;
};
export type LeadsEvents = (typeof leadsEvents)[keyof typeof leadsEvents];

export type LeadDomainEvents = {
  [leadsEvents.leadCreated]: LeadCreatedEvent;
  [leadsEvents.leadDeleted]: LeadDeletedEvent;
  [leadsEvents.leadUnassigned]: LeadUnassignedEvent;
  [leadsEvents.leadUpdated]: LeadUpdatedEvent;
  [leadsEvents.noteAdded]: NoteAddedEvent;
  [leadsEvents.noteDeleted]: NoteDeletedEvent;
};
