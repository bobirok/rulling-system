import { Request, Response } from "express";
import { LogController } from "../../src/application/controllers/log-controller";
import { container } from "../../src/di/container";
import { LogService } from "../../src/domain/services/log-service";
import { createRequest, createResponse } from "node-mocks-http";
import { LOG_ACTION } from "../../src/domain/enums/log-action";
import { LOG_CONTROLLER, LOG_SERVICE } from "../../src/constants/constants";

describe("LogController", () => {
  const logService = container.resolve<LogService>(LOG_SERVICE);
  const logController = container.resolve<LogController>(LOG_CONTROLLER);

  logService.create = jest.fn();
  logService.getLogs = jest.fn().mockResolvedValue([]);

  it("getLogs should make a call to LogService.getLogs", async () => {
    // Given

    // When
    await logController.getLogs(createRequest(), createResponse());

    // Then
    expect(logService.getLogs).toHaveBeenCalledTimes(1);
  });

  it("create should make a call to LogService.create", async () => {
    // Given
    const request = createRequest();
    request.body = { action: LOG_ACTION.Create, message: "TEST" };

    // When
    await logController.createLog(request, createResponse());

    // Then
    expect(logService.create).toHaveBeenCalledTimes(1);
  });
});
