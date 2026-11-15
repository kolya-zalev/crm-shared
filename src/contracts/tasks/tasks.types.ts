import { LeadDeletedEvent, leadsEvents } from "../leads/events";
import {
  CreateTaskData,
  LeadIdPayload,
  RemoveTaskPayload,
  TaskDto,
  UpdateTaskData,
} from "../leads/leads.types";
import type { tasksMessages } from "./messages";

export type CreateTaskInServicePayload = {
  leadId: string;
  data: CreateTaskData;
};
export type UpdateTaskInServicePayload = {
  taskId: string;
  data: UpdateTaskData;
};
type Empty = Record<string, never>;

export type TasksContract = {
  [tasksMessages.tasksFindAll]: { payload: Empty; response: TaskDto[] };
  [tasksMessages.tasksFindByLead]: {
    payload: LeadIdPayload;
    response: TaskDto[];
  };
  [tasksMessages.tasksCreate]: {
    payload: CreateTaskInServicePayload;
    response: TaskDto;
  };
  [tasksMessages.tasksUpdate]: {
    payload: UpdateTaskInServicePayload;
    response: TaskDto;
  };
  [tasksMessages.tasksRemove]: {
    payload: RemoveTaskPayload;
    response: TaskDto;
  };
};

export type TasksEvents = {
  [leadsEvents.leadDeleted]: LeadDeletedEvent;
};
