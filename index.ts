import http from "http";
import logger from "./helper/LoggerManager";
import { json, urlencoded } from "body-parser";
import express from "express";
import cors from "cors";
import mainRoutes from "./src/api/mainRoutes";
import { errorMiddleware, notFoundMiddleware } from "./helper/exceptions";
import DataBaseConfig from "./src/database/DataBaseConfig";

class App {
  public app: express.Application;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.config();
    this.server = http.createServer(this.app);
    this.listen();
  }

  private config() {
    DataBaseConfig.dbInit();
    this.app.use(cors());
    /** support application/json type post data */
    this.app.use(json());
    /** support application/x-www-form-urlencoded post data */
    this.app.use(urlencoded({ extended: true }));
    /** add routes */
    this.app.use("/api", mainRoutes);
    /** not found error */
    this.app.use(notFoundMiddleware);
    /** internal server Error */
    this.app.use(errorMiddleware);
  }

  private listen() {
    this.server.listen(process.env.PORT ?? 1234, () => {
      logger.info(
        `Server listening on port ${process.env.PORT ?? 1234} - env: dev`
      );
    });
  }
}

export default new App().app;
