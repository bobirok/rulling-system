import { Op } from "sequelize";
import {
  ICreateConfigDTO,
  IUpdateConfigDTO,
} from "../../domain/dtos/createConfigDto";
import { IConfiguration } from "../../domain/types/configuration";
import { sequelize } from "../db/db";
import { ConfigurationModel } from "../models/configuration";
import { ConfigurationRule } from "../../domain/types/configuration-rule";

export class ConfigurationClient {
  public async getAll(): Promise<IConfiguration[]> {
    return await ConfigurationModel.findAll();
  }

  public async getById(id: number): Promise<IConfiguration> {
    return await ConfigurationModel.findByPk(id);
  }

  public async getByRules(
    rules: ConfigurationRule[]
  ): Promise<IConfiguration | null> {
    return await ConfigurationModel.findOne({
      where: {
        configurationRules: {
          [Op.eq]: rules,
        },
      },
    });
  }

  public async createOrRestore(
    config: ICreateConfigDTO
  ): Promise<IConfiguration> {
    const existingConfig = await ConfigurationModel.findOne({
      where: {
        configurationRules: {
          [Op.eq]: config.configurationRules,
        },
      },
      paranoid: false,
    });

    if (!existingConfig) {
      return await ConfigurationModel.create({ ...config });
    }

    await existingConfig.restore();
    return existingConfig;
  }

  public async update(
    config: IUpdateConfigDTO,
    replace: boolean = false
  ): Promise<IConfiguration> {
    const existingConfig = await ConfigurationModel.findByPk(config.id);

    if (replace) {
      return existingConfig.update(config);
    }

    const transaction = await sequelize.transaction();
    try {
      const newConfig = await ConfigurationModel.create(
        { ...config, id: null },
        { transaction }
      );

      await ConfigurationModel.destroy({
        where: { id: config.id },
        transaction,
      });

      await transaction.commit();
      return newConfig;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  public async delete(id: number): Promise<void> {
    await ConfigurationModel.destroy({ where: { id } });
  }
}
