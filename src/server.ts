// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./infrastructure/db/db";
import { container } from "./di/container";
import { LogController } from "./application/controllers/log-controller";
import { ConfigurationController } from "./application/controllers/configuration-controller";
import { ConfigurationService } from "./domain/services/configuration-service";
import { TransactionMonitorService } from "./domain/services/transaction-monitor-service";
import {
  CONFIG_CONTROLLER,
  CONFIG_SERVICE,
  LOG_CONTROLLER,
  TRANSACTION_MONITOR_SERVICE,
} from "./constants/constants";

BigInt.prototype["toJSON"] = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

async function startServer() {
  const configService = container.resolve<ConfigurationService>(CONFIG_SERVICE);
  const transactionMonitorService =
    container.resolve<TransactionMonitorService>(TRANSACTION_MONITOR_SERVICE);
  const configController =
    container.resolve<ConfigurationController>(CONFIG_CONTROLLER);
  const logController = container.resolve<LogController>(LOG_CONTROLLER);

  await sequelize.sync({ force: false });

  await configService.loadConfigurations();

  const app = express();
  app.use(bodyParser.json());

  app.use("/api", configController.router);
  app.use("/api", logController.router);

  await transactionMonitorService.startMonitoring();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
