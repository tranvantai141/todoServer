import { UserEntity } from "../_modelExport";
import { sequelize } from "../dbConnect";
import { DataTypes, Model, Optional } from "sequelize";

export enum ETodoStatus {
  completed = "Completed",
  cancelled = " Cancelled",
  inProgress = "InProgress",
}

interface ITodoAttributes {
  id: number;
  content: string;
  status: ETodoStatus;
  userId: number;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface ITodoInput extends Optional<ITodoAttributes, "id"> {}
export interface ITodoOutput extends Required<ITodoAttributes> {}

class TodoEntity
  extends Model<ITodoAttributes, ITodoInput>
  implements ITodoAttributes
{
  public id!: number;
  public content!: string;
  public status!: ETodoStatus;
  public userId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

TodoEntity.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: ETodoStatus.inProgress,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    paranoid: true,
  }
);

TodoEntity.belongsTo(UserEntity, {
  foreignKey: "userId",
});

UserEntity.hasMany(TodoEntity, {
  foreignKey: "userId",
});

export default TodoEntity;
