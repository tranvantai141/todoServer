import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ResponseStatusCode from "./ResponseStatusCode";
import UserEntityService from "@/src/database/userEntity/userEntity.service";

class MiddlewareManager {
  public static async authMiddleWare(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.headers.authorization)
        throw new Error("Missing authorization header!");
      const token = req.headers.authorization;
      const decodedToken = jwt.verify(token, process.env.JWT_KEY ?? "") as {
        userId: number;
      };
      const userId = decodedToken.userId;

      if (!userId) {
        res.sendStatus(ResponseStatusCode.clientError.unauthorized);
        return;
      }
      const user = await UserEntityService.getById(userId);
      if (!user) {
        res.sendStatus(ResponseStatusCode.clientError.unauthorized);
        return;
      }
      return next();
    } catch (error: any) {
      res.status(ResponseStatusCode.clientError.unauthorized).json({
        message: error.message,
      });
    }
  }
}

export default MiddlewareManager;
