import { Router } from "express";
import UserEntityRouter from "./userEntity/userEntity.routes";

class MainRoutes {
  public routers: Router;

  constructor() {
    this.routers = Router();
    this.config();
  }

  private config() {
    this.routers.use("/users", new UserEntityRouter().router);
  }
}

export default new MainRoutes().routers;
