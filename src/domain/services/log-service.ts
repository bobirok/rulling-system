import { LogClient } from "../../infrastructure/clients/log-client";
import { LOG_ACTION } from "../enums/log-action";
import { ILog } from "../types/log";

export class LogService {
  private _logClient: LogClient;

  constructor(logClient: LogClient) {
    this._logClient = logClient;
  }

  public async create(action: LOG_ACTION, message: string): Promise<ILog> {
    return this._logClient.create({ action, message });
  }

  public async getLogs(
    limit: number = 10,
    offset: number = 0
  ): Promise<ILog[]> {
    return this._logClient.getLogs(limit, offset);
  }
}
