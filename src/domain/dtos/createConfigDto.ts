import { ConfigurationRule } from "../types/configuration-rule";

export interface ICreateConfigDTO {
  configurationRules: ConfigurationRule[];
}

export interface IUpdateConfigDTO extends Partial<ICreateConfigDTO> {
  id: number;
}
