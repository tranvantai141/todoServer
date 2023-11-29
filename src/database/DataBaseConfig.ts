require("dotenv").config();
import { TodoEntity, UserEntity } from "./_modelDataBaseExport";

class DataBaseConfig {
  private static sync = process.env.DB_SYNC === "true";

  public static dbInit = () => {
    return Promise.all([
      UserEntity.sync({ alter: this.sync }),
      TodoEntity.sync({ alter: this.sync }),
    ]);
  };
}

export default DataBaseConfig;
