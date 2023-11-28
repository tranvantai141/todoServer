import { sequelize } from "../dbConnect";
import { DataTypes, Model, Optional } from "sequelize";

interface IUserAttributes {
  id: number;
  email: string;
  username: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface IUserInput extends Optional<IUserAttributes, "id"> {}
export interface IUserOutput extends Required<IUserAttributes> {}

class UserEntity
  extends Model<IUserAttributes, IUserInput>
  implements IUserAttributes
{
  public id!: number;
  public email!: string;
  public username!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

UserEntity.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    paranoid: true,
  }
);

export default UserEntity;
