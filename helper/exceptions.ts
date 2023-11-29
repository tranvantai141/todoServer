import { NextFunction, Request, Response } from "express";
import logger from "./LoggerManager";
import ResponseStatusCode from "./ResponseStatusCode";

/** Returns 404 if no path is found */
const notFoundMiddleware = (req: Request, res: Response) => {
  logger.error(
    `-----------------------BEGIN ERROR-------------------------------`
  );
  logger.error(`NOT FOUND URL: ${req.path}`);
  logger.error(
    `-----------------------END ERROR---------------------------------`
  );
  res
    .status(ResponseStatusCode.clientError.not_found)
    .send({ message: `Not found URL ${req.path}` });
};

/** Returns 403 if csrf */
const csrfMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.code !== "EBADCSRFTOKEN") return next(error);
  logger.error(
    `-----------------------BEGIN ERROR-------------------------------`
  );
  logger.error(`CSRF ERROR: ${req.path}`);
  logger.error(error.message);
  logger.error(
    `-----------------------END ERROR---------------------------------`
  );
  res
    .status(ResponseStatusCode.clientError.bad_request)
    .send({ message: error.message });
};

/** Returns 500 if server error is encountered */
const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(
    `-----------------------BEGIN ERROR-------------------------------`
  );
  logger.error(`API ERROR: ${req.path}`);
  logger.error(error.message);
  logger.error(
    `-----------------------END ERROR---------------------------------`
  );
  res
    .status(ResponseStatusCode.serverError.internal_server_error)
    .send({ message: error.message });
};

export { notFoundMiddleware, csrfMiddleware, errorMiddleware };
