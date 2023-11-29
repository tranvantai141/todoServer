import {
  ITodoInput,
  ITodoOutput,
} from "../../database/todoIEntity/todoEntity.model";
import { ITodoEntity } from "./todoEntity.interface";

export const todoDTO = (todoOutput: ITodoOutput): ITodoEntity => {
  return {
    id: todoOutput.id,
    userId: todoOutput.userId,
    content: todoOutput.content,
    status: todoOutput.status,
    createdAt: todoOutput.createdAt,
    updatedAt: todoOutput.updatedAt,
  };
};
