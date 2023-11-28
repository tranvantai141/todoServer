import { Router } from "express";
import UserEntityController from "./userEntity.controller";

class UserEntityRouter {
  public router: Router = Router();
  private _userController = new UserEntityController();

  constructor() {
    this.config();
  }

  private config() {
    this.router.post("", this._userController.register);

    this.router.put("", this._userController.update);

    this.router.get("/:id", this._userController.getById);

    this.router.get("", this._userController.getAll);

    this.router.delete("/:id", this._userController.delete);
  }
}

export default UserEntityRouter;
