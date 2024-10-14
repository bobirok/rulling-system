import { Op } from "sequelize";
import { ConfigurationRule } from "../../domain/types/configuration-rule";
import { sequelize } from "../db/db";
import { DataTypes, Model } from "sequelize";

class ConfigurationModel extends Model {
  public id!: number;
  public configurationRules!: ConfigurationRule[];
}

ConfigurationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    configurationRules: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "configurations",
    paranoid: true,
    sequelize,
    indexes: [
      {
        fields: ["configurationRules", "deletedAt"],
        unique: true,
        where: {
          deletedAt: {
            [Op.ne]: null,
          }
        }
      },
    ]
  }
);

export { ConfigurationModel };
