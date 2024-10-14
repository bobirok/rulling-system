import { LOG_ACTION } from "../../src/domain/enums/log-action";
import { ILog } from "../../src/domain/types/log";

export const logMock: ILog = {
  id: 1,
  action: LOG_ACTION.Create,
  message: "Configuration 1 created",
};

export const arrayOfLogsMock: ILog[] = [
  {
    id: 1,
    action: LOG_ACTION.Create,
    message: "Configuration 1 created",
  },
  {
    id: 2,
    action: LOG_ACTION.Update,
    message: "Configuration 1 updated",
  },
  {
    id: 3,
    action: LOG_ACTION.Delete,
    message: "Configuration 1 deleted",
  },
  {
    id: 4,
    action: LOG_ACTION.Create,
    message: "Configuration 2 created",
  },
  {
    id: 5,
    action: LOG_ACTION.Update,
    message: "Configuration 2 updated",
  },
  {
    id: 6,
    action: LOG_ACTION.Delete,
    message: "Configuration 2 deleted",
  },
  {
    id: 7,
    action: LOG_ACTION.Create,
    message: "Configuration 3 created",
  },
  {
    id: 8,
    action: LOG_ACTION.Update,
    message: "Configuration 3 updated",
  },
  {
    id: 9,
    action: LOG_ACTION.Delete,
    message: "Configuration 3 deleted",
  },
  {
    id: 10,
    action: LOG_ACTION.Create,
    message: "Configuration 4 created",
  },
  {
    id: 11,
    action: LOG_ACTION.Update,
    message: "Configuration 4 updated",
  },
  {
    id: 12,
    action: LOG_ACTION.Delete,
    message: "Configuration 4 deleted",
  },
  {
    id: 13,
    action: LOG_ACTION.Create,
    message: "Configuration 5 created",
  },
  {
    id: 14,
    action: LOG_ACTION.Update,
    message: "Configuration 5 updated",
  },
  {
    id: 15,
    action: LOG_ACTION.Delete,
    message: "Configuration 5 deleted",
  },
  {
    id: 16,
    action: LOG_ACTION.Create,
    message: "Configuration 6 created",
  },
  {
    id: 17,
    action: LOG_ACTION.Update,
    message: "Configuration 6 updated",
  },
  {
    id: 18,
    action: LOG_ACTION.Delete,
    message: "Configuration 6 deleted",
  },
  {
    id: 19,
    action: LOG_ACTION.Create,
    message: "Configuration 7 created",
  },
];
