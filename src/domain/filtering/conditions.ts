import { OPERATOR } from "../enums/operator";

type ConditionOperation = (
  transactionField: string | bigint,
  configField: string | bigint
) => boolean;

export const conditions: Record<OPERATOR, ConditionOperation> = {
  [OPERATOR.Equals]: (a, b) => a == b,
  [OPERATOR.Includes]: (a: string, b: string) => a.includes(b),
  [OPERATOR.GreaterThan]: (a: bigint, b: bigint) => a > b,
  [OPERATOR.LessThan]: (a: bigint, b: bigint) => a < b,
};
