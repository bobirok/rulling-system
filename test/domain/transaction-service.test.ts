import {
  TRANSACTION_CLIENT,
  TRANSACTION_SERVICE,
} from "../../src/constants/constants";
import { container } from "../../src/di/container";
import { TransactionService } from "../../src/domain/services/transaction-service";
import { TransactionClient } from "../../src/infrastructure/clients/transaction-client";
import { configurationMock } from "../mocks/configurations";
import { transactionMock } from "../mocks/transactions";

describe("TransactionService", () => {
  const transactionClient =
    container.resolve<TransactionClient>(TRANSACTION_CLIENT);
  const transactionService =
    container.resolve<TransactionService>(TRANSACTION_SERVICE);

  transactionClient.create = jest.fn().mockResolvedValue(transactionMock);

  it("create should create a new transaction", async () => {
    // Given
    const matchingConfigId = configurationMock.id;

    // When
    const createdTransaction = await transactionService.create(
      transactionMock,
      matchingConfigId
    );

    // Then
    expect(createdTransaction).toEqual(transactionMock);
    expect(transactionClient.create).toHaveBeenCalledTimes(1);
  });
});
