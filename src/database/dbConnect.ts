import { Options, Sequelize } from "sequelize";
import { config } from "dotenv";

const envFound = config({
  path: `env/.env.${process.env.NODE_ENV || "development"}`,
});

if (!envFound) throw new Error("Couldn't find .env file");

const dbConfig: Options = {
  username: "kai",
  password: "Hello1234@",
  host: "localhost",
  database: "todoServer",
  dialect: "postgres",
  dialectOptions: {
    connectTimeout: 60000,
  },
  port: 5432,
  pool: {
    min: 5,
    max: 10,
    idle: 10,
  },
};
let sequelize: Sequelize = new Sequelize(dbConfig);

export { sequelize };
