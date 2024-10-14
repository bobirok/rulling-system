import { sequelize } from "../db/db";
import { DataTypes, Model } from "sequelize";
import { LOG_ACTION } from "../../domain/enums/log-action";

class LogModel extends Model {
  public id!: number;
  public action!: LOG_ACTION;
  public message!: string;
}

LogModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.ENUM,
      values: Object.values(LOG_ACTION),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Log",
    tableName: "logs",
    timestamps: true,
  }
);

export { LogModel };
