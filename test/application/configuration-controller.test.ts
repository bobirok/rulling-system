import { createRequest, createResponse } from "node-mocks-http";
import { ConfigurationController } from "../../src/application/controllers/configuration-controller";
import { container } from "../../src/di/container";
import { ConfigurationService } from "../../src/domain/services/configuration-service";
import {
  CONFIG_CONTROLLER,
  CONFIG_SERVICE,
} from "../../src/constants/constants";

describe("ConfigurationController", () => {
  const configService = container.resolve<ConfigurationService>(CONFIG_SERVICE);
  const configController =
    container.resolve<ConfigurationController>(CONFIG_CONTROLLER);

  configService.create = jest.fn();
  configService.getAll = jest.fn().mockResolvedValue([]);
  configService.update = jest.fn();
  configService.delete = jest.fn();
  configService.loadConfigurations = jest.fn();

  it("getAllConfigs should make a call to ConfigurationService.getAll", async () => {
    // Given

    // When
    await configController.getAllConfigs(createRequest(), createResponse());

    // Then
    expect(configService.getAll).toHaveBeenCalledTimes(1);
  });

  it("createConfig should make a call to ConfigurationService.create", async () => {
    // Given
    const request = createRequest();
    request.body = { configurationRules: [] };

    // When
    await configController.createConfig(request, createResponse());

    // Then
    expect(configService.create).toHaveBeenCalledTimes(1);
  });

  it("updateConfig should make a call to ConfigurationService.update", async () => {
    // Given
    const request = createRequest();
    request.body = { id: 1, configurationRules: [] };

    // When
    await configController.updateConfig(request, createResponse());

    // Then
    expect(configService.update).toHaveBeenCalledTimes(1);
  });

  it("deleteConfig should make a call to ConfigurationService.delete", async () => {
    // Given
    const request = createRequest();
    request.params = { id: "1" };

    // When
    await configController.deleteConfig(request, createResponse());

    // Then
    expect(configService.delete).toHaveBeenCalledTimes(1);
  });
});
