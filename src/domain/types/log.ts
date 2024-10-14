import { LOG_ACTION } from "../enums/log-action";

export interface ILog {
  id: number;
  action: LOG_ACTION;
  message: string;
}
