import { LOG_CLIENT, LOG_SERVICE } from "../../src/constants/constants";
import { container } from "../../src/di/container";
import { LOG_ACTION } from "../../src/domain/enums/log-action";
import { LogService } from "../../src/domain/services/log-service";
import { LogClient } from "../../src/infrastructure/clients/log-client";
import { arrayOfLogsMock, logMock } from "../mocks/logs";

describe("LogService", () => {
  const logClient = container.resolve<LogClient>(LOG_CLIENT);
  const logService = container.resolve<LogService>(LOG_SERVICE);

  logClient.create = jest.fn().mockResolvedValue(logMock);
  logClient.getLogs = jest.fn().mockResolvedValue(arrayOfLogsMock);

  it("getLogs should return all logs from DB", async () => {
    // Given

    // When
    const logs = await logService.getLogs();

    // Then
    expect(logs.length).toEqual(arrayOfLogsMock.length);
    expect(logClient.getLogs).toHaveBeenCalledTimes(1);
  });

  it("create should create a new log", async () => {
    // Given

    // When
    const createdLog = await logService.create(logMock.action, logMock.message);

    // Then
    expect(createdLog).toEqual(logMock);
    expect(logClient.create).toHaveBeenCalledTimes(1);
  });
});
