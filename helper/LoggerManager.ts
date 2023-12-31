import { existsSync, mkdirSync } from "fs";
import moment from "moment";
import path from "path";
import winston from "winston";

class LoggerManager {
  private loggerInstance: winston.Logger;

  constructor() {
    if (!existsSync(path.resolve(__dirname, `../logs`))) {
      mkdirSync(path.resolve(__dirname, `../logs`));
    }

    this.loggerInstance = winston.createLogger({
      // level: config.logs.level,
      // levels: winston.config.npm.levels,
      exitOnError: false,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        winston.format.printf(
          (info) =>
            `[${moment(info.timestamp).format("YYYY-MM-DD HH:mm:ss")}] ${
              info.level
            }: ${info.message}`
        )
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: path.resolve(
            __dirname,
            `../logs/${moment().format("YYYY-MM-DD HH")}-00.log`
          ),
        }),
      ],
    });
  }

  getLoggerInstance() {
    return this.loggerInstance;
  }
}

export default new LoggerManager().getLoggerInstance();
