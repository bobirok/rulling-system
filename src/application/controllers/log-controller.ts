import { Request, Response, Router } from "express";
import { LogService } from "../../domain/services/log-service";
import { IPaginationParams } from "../request-types/paginated-request";

export class LogController {
  private _logService: LogService;

  public router: Router;

  constructor(logService: LogService) {
    this._logService = logService;
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.post("/logs", this.createLog.bind(this));
    this.router.get("/logs", this.getLogs.bind(this));
  }

  async createLog(req: Request, res: Response): Promise<void> {
    const { action, message } = req.body;

    try {
      const log = await this._logService.create(action, message);

      res.status(201).json(log);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLogs(req: Request, res: Response): Promise<void> {
    const { limit, offset } = req.query as IPaginationParams;

    try {
      const logs = await this._logService.getLogs(limit, offset);

      res.status(200).json(logs);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
