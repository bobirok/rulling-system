import {
  CONFIG_CLIENT,
  CONFIG_SERVICE,
  LOG_SERVICE,
} from "../../src/constants/constants";
import { container } from "../../src/di/container";
import { LOG_ACTION } from "../../src/domain/enums/log-action";
import { OPERATOR } from "../../src/domain/enums/operator";
import { ConfigurationService } from "../../src/domain/services/configuration-service";
import { LogService } from "../../src/domain/services/log-service";
import { IConfiguration } from "../../src/domain/types/configuration";
import { ConfigurationClient } from "../../src/infrastructure/clients/configuration-client";
import {
  anotherConfigurationMock,
  configurationMock,
  configWithManyRulesMock,
} from "../mocks/configurations";
import { anotherTransactionMock, transactionMock } from "../mocks/transactions";

const configClient = container.resolve<ConfigurationClient>(CONFIG_CLIENT);
const configService = container.resolve<ConfigurationService>(CONFIG_SERVICE);
const logService = container.resolve<LogService>(LOG_SERVICE);

describe("ConfigurationService", () => {
  const FALSY_ID = 12341234;

  logService.create = jest.fn();
  configService.emit = jest.fn();
  configClient.getAll = jest.fn().mockResolvedValue([configurationMock]);
  configClient.createOrRestore = jest
    .fn()
    .mockResolvedValue(anotherConfigurationMock);

  it("getConfigurations should return empty array initially", () => {
    // Given

    // When
    const configurations = configService.getConfigurations();

    // Then
    expect(configurations.length).toEqual(0);
  });

  it("getConfigurations should return all configurations from DB after loadConfiguration is called", async () => {
    // Given

    // When
    await configService.loadConfigurations();
    const configurations = configService.getConfigurations();

    // Then
    expect(configurations.length).toEqual(1);
    expect(configurations[0]).toEqual(configurationMock);
  });

  it("getAll should return all configurations from DB", async () => {
    // Given

    // When
    const configurations = await configService.getAll();

    // Then
    expect(configurations.length).toEqual(1);
    expect(configurations[0]).toEqual(configurationMock);
  });

  it("create should initialize a new configuration and report it to logService", async () => {
    // Given
    configClient.getByRules = jest.fn().mockResolvedValueOnce(null);

    // When
    const createdConfig = await configService.create({
      configurationRules: anotherConfigurationMock.configurationRules,
    });

    // Then
    expect(createdConfig).toEqual(anotherConfigurationMock);
    expect(configService.getConfigurations().length).toEqual(2);
    expect(logService.create).toHaveBeenCalledWith(
      LOG_ACTION.Create,
      `Configuration ${anotherConfigurationMock.id} created`
    );
  });

  it("create should throw error when configuration with same rules already exists", async () => {
    // Given
    configClient.getByRules = jest
      .fn()
      .mockResolvedValueOnce(anotherConfigurationMock);

    // When

    // Then
    await expect(
      configService.create({
        configurationRules: anotherConfigurationMock.configurationRules,
      })
    ).rejects.toThrow("There is an active config with these rules.");
  });

  it("update should throw error when invalid id is passed", async () => {
    // Given
    configClient.getById = jest.fn().mockResolvedValueOnce(null);

    // When

    // Then
    await expect(
      configService.update({
        id: FALSY_ID,
        configurationRules: [],
      })
    ).rejects.toThrow(`Configuration with id ${FALSY_ID} does not exist`);
  });

  it("update should not update configuration when no changes are made", async () => {
    // Given
    configClient.getById = jest.fn().mockResolvedValueOnce(configurationMock);
    const unchangedConfig = configurationMock;

    // When
    const updatedConfig = await configService.update(unchangedConfig);

    // Then
    expect(updatedConfig).toEqual(configurationMock);
  });

  it("update should update configuration when changes are made", async () => {
    // Given
    const updatedConfig: IConfiguration = {
      id: configurationMock.id,
      configurationRules: [
        {
          field: "value",
          operator: OPERATOR.Equals,
          value: 1n,
        },
      ],
    };
    configClient.getById = jest.fn().mockResolvedValueOnce(configurationMock);
    configClient.update = jest.fn().mockResolvedValueOnce(updatedConfig);

    // When
    const result = await configService.update(updatedConfig);

    // Then
    expect(result).toEqual(updatedConfig);
  });

  it("update should report this action to logService", async () => {
    // Given
    const updatedConfig: IConfiguration = {
      id: configurationMock.id,
      configurationRules: [
        {
          field: "value",
          operator: OPERATOR.Equals,
          value: 1n,
        },
      ],
    };
    configClient.getById = jest.fn().mockResolvedValueOnce(configurationMock);
    configClient.update = jest.fn().mockResolvedValueOnce(updatedConfig);

    // When
    await configService.update(updatedConfig);

    // Then
    expect(logService.create).toHaveBeenCalledWith(
      LOG_ACTION.Update,
      `Configuration ${updatedConfig.id} updated ${JSON.stringify(
        configurationMock.configurationRules
      )} => ${JSON.stringify(updatedConfig.configurationRules)}`
    );
  });

  it("delete should throw error when invalid id is passed", async () => {
    // Given
    configClient.getById = jest.fn().mockResolvedValueOnce(null);

    // When

    // Then
    await expect(configService.delete(FALSY_ID)).rejects.toThrow(
      `Configuration with id ${FALSY_ID} does not exist`
    );
  });

  it("delete should delete configuration when valid id is passed", async () => {
    // Given
    configClient.getById = jest.fn().mockResolvedValueOnce(configurationMock);
    configClient.delete = jest.fn();
    const existingConfig = configService.getConfigurations()[0];

    // When
    await configService.delete(existingConfig.id);

    // Then
    expect(configService.getConfigurations().length).toEqual(1);
    expect(configClient.delete).toHaveBeenCalledWith(configurationMock.id);
  });

  it("getMatchingConfigurationId should return null when no configuration matches", async () => {
    // Given
    configClient.getAll = jest.fn().mockResolvedValue([configurationMock]);
    await configService.loadConfigurations();

    // When
    const matchingId =
      configService.getMatchingConfigurationId(transactionMock);

    // Then
    expect(matchingId).toBeNull();
  });

  it("getMatchingConfigurationId should return configuration id when a configuration matches", async () => {
    // Given
    configClient.getAll = jest.fn().mockResolvedValue([configurationMock]);
    await configService.loadConfigurations();

    // When
    const matchingId = configService.getMatchingConfigurationId(
      anotherTransactionMock
    );

    // Then
    expect(matchingId).toEqual(configurationMock.id);
  });

  it("getMatchingConfigurationId should match config with many configRules", async () => {
    // Given
    configClient.getAll = jest
      .fn()
      .mockResolvedValue([configWithManyRulesMock]);
    await configService.loadConfigurations();

    // When
    const matchingId =
      configService.getMatchingConfigurationId(transactionMock);

    // Then
    expect(matchingId).toEqual(configWithManyRulesMock.id);
  });

  it("getMatchingConfigurationId should match config from list of configs", async () => {
    // Given
    configClient.getAll = jest
      .fn()
      .mockResolvedValue([anotherConfigurationMock, configWithManyRulesMock]);
    await configService.loadConfigurations();

    // When
    const matchingId =
      configService.getMatchingConfigurationId(transactionMock);

    // Then
    expect(matchingId).toEqual(configWithManyRulesMock.id);
  });
});
