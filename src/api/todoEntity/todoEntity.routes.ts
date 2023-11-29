import { Router } from "express";
import TodoEntityController from "./todoEntity.controller";

class TodoEntityRouter {
  public router: Router = Router();
  private _userController = new TodoEntityController();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("", this._userController.create);

    this.router.put("", this._userController.update);

    this.router.get("/:userId", this._userController.getByUserId);

    this.router.get("/todoDetail/:id", this._userController.getById);

    this.router.delete("/:id", this._userController.delete);
  }
}

export default TodoEntityRouter;
