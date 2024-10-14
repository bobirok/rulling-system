import { ConfigurationRule } from "./configuration-rule";

export interface IConfiguration {
  id: number;
  configurationRules: ConfigurationRule[];
}
