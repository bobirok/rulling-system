export interface ITransaction {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  gasLimit: bigint;
  gasPrice: bigint;
}
