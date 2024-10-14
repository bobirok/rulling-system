import { ConfigurationClient } from "../../infrastructure/clients/configuration-client";
import { isEqual } from "lodash";
import { IConfiguration } from "../types/configuration";
import { ICreateConfigDTO, IUpdateConfigDTO } from "../dtos/createConfigDto";
import { ITransaction } from "../types/transaction";
import { conditions } from "../filtering/conditions";
import { ConfigurationRule } from "../types/configuration-rule";
import { EventEmitter } from "events";
import { LogService } from "./log-service";
import { LOG_ACTION } from "../enums/log-action";
import { NotFoundError } from "../../exceptions/not-found";
import { BadRequest } from "../../exceptions/bad-request";

export class ConfigurationService extends EventEmitter {
  private _configurations: IConfiguration[];
  private _configurationClient: ConfigurationClient;
  private _logService: LogService;

  constructor(configClient: ConfigurationClient, logService: LogService) {
    super();
    this._configurations = [];
    this._configurationClient = configClient;
    this._logService = logService;
  }

  public getConfigurations(): IConfiguration[] {
    return this._configurations;
  }

  public async getAll(): Promise<IConfiguration[]> {
    return await this._configurationClient.getAll();
  }

  public async create(config: ICreateConfigDTO): Promise<IConfiguration> {
    const existingConfig = await this._configurationClient.getByRules(
      config.configurationRules
    );

    if (!!existingConfig) {
      await this._logService.create(
        LOG_ACTION.Error,
        `Config already exists ${JSON.stringify(config)}`
      );
      throw new BadRequest("There is an active config with these rules.");
    }

    const createdConfig = await this._configurationClient.createOrRestore(
      config
    );

    this._configurations.push(createdConfig);
    this.emit("configChanged", this._configurations);

    await this._logService.create(
      LOG_ACTION.Create,
      `Configuration ${createdConfig.id} created`
    );

    return createdConfig;
  }

  public async update(config: IUpdateConfigDTO): Promise<IConfiguration> {
    const existingConfig = await this._configurationClient.getById(config.id);

    if (!existingConfig) {
      throw new NotFoundError(
        `Configuration with id ${config.id} does not exist`
      );
    }

    if (isEqual(existingConfig.configurationRules, config.configurationRules)) {
      return existingConfig;
    }

    const updatedConfig = await this._configurationClient.update(config);
    await this._logService.create(
      LOG_ACTION.Update,
      `Configuration ${config.id} updated ${JSON.stringify(
        existingConfig.configurationRules
      )} => ${JSON.stringify(config.configurationRules)}`
    );

    this._configurations = this._configurations.map((config) =>
      config.id === updatedConfig.id ? updatedConfig : config
    );

    return updatedConfig;
  }

  public async delete(id: number): Promise<void> {
    const existingConfig = await this._configurationClient.getById(id);

    if (!existingConfig) {
      throw new NotFoundError(`Configuration with id ${id} does not exist`);
    }

    await this._configurationClient.delete(id);
    this._configurations = this._configurations.filter(
      (config) => config.id !== id
    );
    this.emit("configChanged", this._configurations);
    this._logService.create(LOG_ACTION.Delete, `Configuration ${id} deleted`);
  }

  public async loadConfigurations(): Promise<void> {
    this._configurations = await this._configurationClient.getAll();
  }

  public getMatchingConfigurationId(transaction: ITransaction): number {
    let matchingId = null;
    this._configurations.forEach((config) => {
      if (
        !!this._transactionMatchesConfig(transaction, config.configurationRules)
      ) {
        matchingId = config.id;
        return;
      }
    });
    return matchingId;
  }

  private _transactionMatchesConfig(
    transaction: ITransaction,
    configRules: ConfigurationRule[]
  ) {
    let matches = true;
    configRules.forEach((configurationRule) => {
      const conditionFunc = conditions[configurationRule.operator];
      const conditionMatches = conditionFunc(
        transaction[configurationRule.field],
        configurationRule.value
      );

      if (!conditionMatches) {
        matches = false;
        return;
      }
    });
    return matches;
  }
}
