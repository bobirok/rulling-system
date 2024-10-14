import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

class TransactionModel extends Model {
  public hash!: string;
  public from!: string;
  public to!: string;
  public value!: bigint;
  public gasLimit!: bigint;
  public gasPrice!: bigint;
}

TransactionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    gasLimit: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    gasPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    configurationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "configurations",
        key: "id",
      },
      onDelete: "NO ACTION",
    },
  },
  {
    sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

export { TransactionModel };
