import { Request, Response, Router } from "express";
import { ConfigurationService } from "../../domain/services/configuration-service";
import { NotFoundError } from "../../exceptions/not-found";
import { BadRequest } from "../../exceptions/bad-request";

export class ConfigurationController {
  private _configService: ConfigurationService;

  public router: Router;

  constructor(configService: ConfigurationService) {
    this.router = Router();
    this._configService = configService;
    this.routes();
  }

  public routes() {
    this.router.get("/configs", this.getAllConfigs.bind(this));
    this.router.post("/configs", this.createConfig.bind(this));
    this.router.put("/configs/:id", this.updateConfig.bind(this));
    this.router.delete("/configs/:id", this.deleteConfig.bind(this));
  }

  async getAllConfigs(_request: Request, response: Response) {
    const configs = await this._configService.getAll();
    response.json(configs);
  }

  async createConfig(request: Request, response: Response) {
    try {
      const config = await this._configService.create(request.body);
      response.json(config);
    } catch (error) {
      if (error instanceof BadRequest) {
        response.status(400).json({ message: error.message });
      }
    }
  }

  async updateConfig(request: Request, response: Response) {
    try {
      await this._configService.update({
        id: parseInt(request.params.id),
        ...request.body,
      });
      response.sendStatus(204);
    } catch (error) {
      if (error instanceof NotFoundError) {
        response.status(404).json({ message: error.message });
      }
    }
  }

  async deleteConfig(request: Request, response: Response) {
    try {
      await this._configService.delete(parseInt(request.params.id));
      response.sendStatus(204);
    } catch (error) {
      if (error instanceof NotFoundError) {
        response.status(404).json({ message: error.message });
      }
    }
  }
}
