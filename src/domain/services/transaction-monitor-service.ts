import { ethers } from "ethers";
import { ConfigurationService } from "./configuration-service";
import { TransactionService } from "./transaction-service";
import { IConfiguration } from "../types/configuration";
import { ITransaction } from "../types/transaction";

export class TransactionMonitorService {
  private _provider: ethers.JsonRpcProvider;
  private _configService: ConfigurationService;
  private _transactionService: TransactionService;

  constructor(
    providerUrl: string,
    configService: ConfigurationService,
    transactionService: TransactionService
  ) {
    this._provider = new ethers.JsonRpcProvider(providerUrl);
    this._configService = configService;
    this._transactionService = transactionService;
    this._setupListeners();
  }

  private _setupListeners(): void {
    this._configService.on(
      "configChanged",
      async (configs: IConfiguration[]) => {
        if (!configs.length) {
          await this.stopMonitoring();
        } else {
          await this.startMonitoring();
        }
      }
    );
  }

  public async startMonitoring(): Promise<void> {
    if (!this._configService.getConfigurations().length) {
      return;
    }

    const activeListeners = await this._provider.listenerCount("block");
    if (activeListeners !== 0) {
      return;
    }

    this._provider.on("block", async (blockNumber) => {
      const block = await this._provider.getBlock(blockNumber);
      block.transactions.length;

      for (const transactionHash of block.transactions) {
        const transaction = await this._provider.getTransaction(
          transactionHash
        );

        if (!transaction) {
          continue;
        }

        const matchingConfig = this._configService.getMatchingConfigurationId(
          <ITransaction>transaction
        );

        if (matchingConfig !== null) {
          await this._transactionService.create(transaction, matchingConfig);
        }
      }
    });
  }

  public async stopMonitoring(): Promise<void> {
    await this._provider.removeAllListeners("block");
  }
}
