export const tasksMessages = {
  tasksFindAll: "tasks.findAll",
  tasksFindByLead: "tasks.findByLead",
  tasksCreate: "tasks.create",
  tasksUpdate: "tasks.update",
  tasksRemove: "tasks.remove",
} as const;

export type TasksMessage = (typeof tasksMessages)[keyof typeof tasksMessages];
