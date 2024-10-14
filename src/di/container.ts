import { asClass, asValue, createContainer } from "awilix";
import { ConfigurationService } from "../domain/services/configuration-service";
import { TransactionMonitorService } from "../domain/services/transaction-monitor-service";
import { ConfigurationClient } from "../infrastructure/clients/configuration-client";
import { TransactionClient } from "../infrastructure/clients/transaction-client";
import { TransactionService } from "../domain/services/transaction-service";
import { LogService } from "../domain/services/log-service";
import { LogClient } from "../infrastructure/clients/log-client";
import { ConfigurationController } from "../application/controllers/configuration-controller";
import { LogController } from "../application/controllers/log-controller";

require("dotenv").config();

const PROVIDER_URL = process.env.INFURA_API_URL;

const container = createContainer({
  injectionMode: "CLASSIC",
});

container.register({
  providerUrl: asValue(PROVIDER_URL),
  configClient: asClass(ConfigurationClient).singleton(),
  transactionClient: asClass(TransactionClient).singleton(),
  logClient: asClass(LogClient).singleton(),
  configService: asClass(ConfigurationService).singleton(),
  transactionService: asClass(TransactionService).singleton(),
  transactionMonitorService: asClass(TransactionMonitorService).singleton(),
  logService: asClass(LogService).singleton(),
  configController: asClass(ConfigurationController).singleton(),
  logController: asClass(LogController).singleton(),
});

export { container };
