import { ICreateLogDTO } from "../../domain/dtos/createLogDto";
import { ILog } from "../../domain/types/log";
import { LogModel } from "../models/log";

export class LogClient {
  public async create(log: ICreateLogDTO): Promise<ILog> {
    return LogModel.create({ ...log });
  }

  public async getLogs(limit: number, offset: number): Promise<ILog[]> {
    return LogModel.findAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });
  }
}
