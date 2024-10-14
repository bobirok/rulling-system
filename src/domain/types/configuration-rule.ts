import { OPERATOR } from "../enums/operator";
import { ITransaction } from "./transaction";
import { Transaction } from "ethers";

export type ConfigurationRule = {
  field: keyof ITransaction;
  operator: OPERATOR;
  value: string | bigint;
};
