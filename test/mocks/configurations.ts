import { OPERATOR } from "../../src/domain/enums/operator";
import { IConfiguration } from "../../src/domain/types/configuration";

export const configurationMock: IConfiguration = {
  id: 1,
  configurationRules: [
    {
      field: "value",
      operator: OPERATOR.GreaterThan,
      value: 100n,
    },
  ],
};

export const anotherConfigurationMock: IConfiguration = {
  id: 2,
  configurationRules: [
    {
      field: "value",
      operator: OPERATOR.LessThan,
      value: 2n,
    },
  ],
};

export const configWithManyRulesMock: IConfiguration = {
  id: 3,
  configurationRules: [
    {
      field: "value",
      operator: OPERATOR.GreaterThan,
      value: 1n,
    },
    {
      field: "gasLimit",
      operator: OPERATOR.LessThan,
      value: 21000n,
    },
    {
      field: "gasPrice",
      operator: OPERATOR.Equals,
      value: 50000000000n,
    },
    {
      field: "hash",
      operator: OPERATOR.Includes,
      value: "0xabc",
    },
  ],
};
