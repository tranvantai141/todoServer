import TodoEntity, { ITodoInput, ITodoOutput } from "./todoEntity.model";
import { Op } from "sequelize";

class TodoEntityService {
  public static create = async (payload: ITodoInput): Promise<ITodoOutput> => {
    return await TodoEntity.create(payload);
  };

  public static getById = async (id: number): Promise<ITodoOutput | null> => {
    return await TodoEntity.findByPk(id);
  };

  public static getAllByUserId = async (
    userId: number,
    filter: string = "",
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ total: number; data: ITodoOutput[] }> => {
    const condition = {
      userId,
      content: { [Op.iLike]: `%${filter}%` },
    };
    const total = await TodoEntity.count({ where: condition });
    const data = await TodoEntity.findAll({
      where: condition,
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return { total, data };
  };

  public static update = async (
    id: number,
    payload: ITodoInput
  ): Promise<ITodoOutput> => {
    const todo = await TodoEntity.findByPk(id);
    if (!todo) {
      throw new Error("Todo item not found!");
    }
    return await todo.update(payload);
  };

  public static destroy = async (id: number): Promise<boolean> => {
    const deleted = await TodoEntity.destroy({ where: { id } });
    return !!deleted;
  };
}

export default TodoEntityService;
