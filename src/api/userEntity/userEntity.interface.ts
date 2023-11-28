export interface IUserEntity {
  id: number;
  email: string;
  username: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
