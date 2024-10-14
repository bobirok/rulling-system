import { LOG_ACTION } from "../enums/log-action";

export interface ICreateLogDTO {
  action: LOG_ACTION;
  message: string;
}
