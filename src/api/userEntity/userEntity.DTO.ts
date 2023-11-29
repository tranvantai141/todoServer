import { IUserOutput } from "../../database/userEntity/userEntity.model";
import { IUserEntity } from "./userEntity.interface";

export const userDTO = (userOutput: IUserOutput): IUserEntity => {
  return {
    id: userOutput.id,
    email: userOutput.email,
    username: userOutput.username,
    createdAt: userOutput.createdAt,
    updatedAt: userOutput.updatedAt,
  };
};
