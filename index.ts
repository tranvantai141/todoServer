import http from "http";
import logger from "./helper/logger";
import { json, urlencoded } from "body-parser";
import express from "express";
import cors from "cors";
import mainRoutes from "./src/api/mainRoutes";
import { errorMiddleware, notFoundMiddleware } from "./helper/exceptions";
import dbInit from "./src/database/dbInit";

class App {
  public app: express.Application;
  private server: http.Server;
  private port: number;

  constructor(port: number = 1234) {
    this.app = express();
    this.port = port;
    this.config();
    this.server = http.createServer(this.app);
    this.listen();
  }

  private config() {
    dbInit();
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
    this.server.listen(this.port, () => {
      logger.info(`Server listening on port ${this.port} - env: dev`);
    });
  }
}

export default new App().app;
