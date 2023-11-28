require("dotenv").config();
import { TodoEntity, UserEntity } from "./_modelExport";

const sync = process.env.DB_SYNC === "TRUE";

const dbInit = () =>
  Promise.all([
    UserEntity.sync({ alter: sync }),
    TodoEntity.sync({ alter: sync }),
  ]);

export default dbInit;
