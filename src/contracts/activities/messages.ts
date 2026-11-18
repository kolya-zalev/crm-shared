export const activitiesMessages = {
  activitiesFindByLead: "activities.findByLead",
} as const;

export type ActivityMessage =
  (typeof activitiesMessages)[keyof typeof activitiesMessages];
