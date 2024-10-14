import { ITransaction } from "../../domain/types/transaction";
import { TransactionModel } from "../models/transaction";

export class TransactionClient {
  public async create(
    transaction: ITransaction,
    configurationId: number
  ): Promise<ITransaction> {
    return await TransactionModel.create({ ...transaction, configurationId });
  }
}
