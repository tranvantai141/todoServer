import { Options, Sequelize } from "sequelize";
import { config } from "dotenv";

const envFound = config({
  path: `env/.env.${process.env.NODE_ENV ?? "development"}`,
});

if (!envFound) throw new Error("Couldn't find .env file");

const dbConfig: Options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: "postgres",
  dialectOptions: {
    connectTimeout: 60000,
  },
  port: parseInt(process.env.DB_PORT as string),
  pool: {
    min: parseInt(process.env.DB_POOL_MIN as string),
    max: parseInt(process.env.DB_POOL_MAX as string),
    idle: parseInt(process.env.DB_POOL_IDLE as string),
  },
};
let sequelize: Sequelize = new Sequelize(dbConfig);

export { sequelize };
