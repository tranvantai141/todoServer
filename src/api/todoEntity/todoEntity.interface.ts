import { ETodoStatus } from "../../database/todoIEntity/todoEntity.model";

export interface ITodoEntity {
  id: number;
  content: string;
  userId: number;
  status: ETodoStatus;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
