import { Request, Response } from "express";
import { todoDTO } from "./todoEntity.DTO";
import ResponseStatusCode from "../../../helper/ResponseStatusCode";
import TodoEntityService from "../../database/todoIEntity/todoEntity.service";

class TodoEntityController {
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const todo = await TodoEntityService.getById(parseInt(id));
      if (todo) {
        res.status(ResponseStatusCode.success.okey).json(todoDTO(todo));
        return;
      }
      res
        .status(ResponseStatusCode.clientError.bad_request)
        .json("todo doesn't exist");
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async getByUserId(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const result = await TodoEntityService.getAllByUserId(parseInt(userId));

      res.status(ResponseStatusCode.clientError.bad_request).json(result);
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const todo = await TodoEntityService.create(req.body);
      res.status(ResponseStatusCode.success.okey).json(todoDTO(todo));
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const todo = await TodoEntityService.update(id, req.body);
      res.status(ResponseStatusCode.success.okey).json(todoDTO(todo));
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const result = await TodoEntityService.destroy(parseInt(id));
      res.status(ResponseStatusCode.success.okey).json(result);
    } catch (err: any) {
      res.status(ResponseStatusCode.serverError.bad_gateway).json(err.message);
    }
  }
}

export default TodoEntityController;
