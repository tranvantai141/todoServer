import { Request, Response } from "express";
import UserEntityService from "../../database/userEntity/userEntity.service";
import { userDTO } from "./userEntity.DTO";
import ResponseStatusCode from "../../../helper/ResponseStatusCode";

class UserEntityController {
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserEntityService.getById(parseInt(id));
      if (user) {
        res.status(ResponseStatusCode.success.okey).json(userDTO(user));
        return;
      }
      res
        .status(ResponseStatusCode.clientError.bad_request)
        .json("User doesn't exist");
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { filter, sortBy, sortType, page, pageSize } = req.query;
      const result = await UserEntityService.getAll(
        filter as string,
        sortBy as string,
        sortType as string,
        page ? parseInt(page as string) : undefined,
        pageSize ? parseInt(pageSize as string) : undefined
      );
      res.status(ResponseStatusCode.success.okey).json({
        ...result,
        data: result.data.map((user) => userDTO(user)),
      });
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserEntityService.create(req.body);
      res.status(ResponseStatusCode.success.okey).json(userDTO(user));
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const user = await UserEntityService.update(id, req.body);
      res.status(ResponseStatusCode.success.okey).json(userDTO(user));
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await UserEntityService.destroy(parseInt(id));
      res.status(ResponseStatusCode.success.okey).json(result);
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }
}

export default UserEntityController;
