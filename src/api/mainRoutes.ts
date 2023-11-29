import { Router } from "express";
import UserEntityRouter from "./userEntity/userEntity.routes";
import TodoEntityRouter from "./todoEntity/todoEntity.routes";

class MainRoutes {
  public routers: Router;

  constructor() {
    this.routers = Router();
    this.config();
  }

  private config() {
    this.routers.use("/user", new UserEntityRouter().router);

    this.routers.use("/todo", new TodoEntityRouter().router);
  }
}

export default new MainRoutes().routers;
