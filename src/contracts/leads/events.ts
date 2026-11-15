export const leadsEvents = {
  leadDeleted: "lead.deleted",
} as const;
export type LeadDeletedEvent = {
  leadId: string;
};
export type LeadsEvents = (typeof leadsEvents)[keyof typeof leadsEvents];
