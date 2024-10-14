import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: false,
});

export { sequelize };
