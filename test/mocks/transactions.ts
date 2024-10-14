import { ITransaction } from "../../src/domain/types/transaction";

export const transactionMock: ITransaction = {
  hash: "0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890a",
  from: "0xF1A3b1C576Bc5e73e7f8b243c9655A91Cd2eA43F",
  to: "0xA3C9f1254678cB76483d4E567A8fbb0d03456789",
  value: 50n,
  gasLimit: 20000n,
  gasPrice: 50000000000n,
};

export const anotherTransactionMock: ITransaction = {
  hash: "0xdef345ghi789jkl012mno345pqr678stu901vwx234yz567890abc123b",
  from: "0xB1E8B9D5E7F3C6Bc98e13f782bc1e4Dd0BaF9a4C",
  to: "0xA4B9e8D0C67c7654D83f0e73AfFeB89aAB567890",
  value: 3500n,
  gasLimit: 500n,
  gasPrice: 1500n,
};

export const arrayOfTransactionsMock: ITransaction[] = [
  {
    hash: "0xabc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890a",
    from: "0xF1A3b1C576Bc5e73e7f8b243c9655A91Cd2eA43F",
    to: "0xA3C9f1254678cB76483d4E567A8fbb0d03456789",
    value: 1500000000000000000n,
    gasLimit: 21000n,
    gasPrice: 50000000000n,
  },
  {
    hash: "0xdef345ghi789jkl012mno345pqr678stu901vwx234yz567890abc123b",
    from: "0xB1E8B9D5E7F3C6Bc98e13f782bc1e4Dd0BaF9a4C",
    to: "0xA4B9e8D0C67c7654D83f0e73AfFeB89aAB567890",
    value: 5n,
    gasLimit: 1000n,
    gasPrice: 60000000000n,
  },
  {
    hash: "0xghi789jkl012mno345pqr678stu901vwx234yz567890abc123def456c",
    from: "0xC3D9d67f298cA9074D8c2B456b73Dc9B765A1234",
    to: "0xD5E9f123456789b83d2d4F7aA89fBb0aA5678cde",
    value: 4n,
    gasLimit: 22000n,
    gasPrice: 45000000000n,
  },
  {
    hash: "0xjkl012mno345pqr678stu901vwx234yz567890abc123def456ghi789d",
    from: "0xE8A9c765345fcb012A9B456b7C73Dd9B12345eDf",
    to: "0xA9C87d6a9876543219B3D2C48f9876b2aCdef890",
    value: 100n,
    gasLimit: 25000n,
    gasPrice: 70000000000n,
  },
];
