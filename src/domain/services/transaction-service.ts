import { TransactionClient } from "../../infrastructure/clients/transaction-client";
import { ITransaction } from "../types/transaction";

export class TransactionService {
  private _transactionClient: TransactionClient;

  constructor(transactionClient: TransactionClient) {
    this._transactionClient = transactionClient;
  }

  public async create(
    transaction: ITransaction,
    configurationId: number
  ): Promise<ITransaction> {
    return await this._transactionClient.create(transaction, configurationId);
  }
}
