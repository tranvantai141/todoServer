import { Op, Order } from "sequelize";
import UserEntity, { IUserInput, IUserOutput } from "./userEntity.model";

class UserEntityService {
  public static getAll = async (
    filter: string,
    sortBy: string,
    sortType: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{
    total: number;
    data: Array<UserEntity>;
  }> => {
    const condition = {
      [Op.or]: [
        { email: { [Op.iLike]: `%${filter}%` } },
        { firstName: { [Op.iLike]: `%${filter}%` } },
        { lastName: { [Op.iLike]: `%${filter}%` } },
      ],
    };
    const sort = sortBy
      ? [[sortBy, sortType ?? "ASC"]]
      : [["createdAt", "DESC"]];
    const total = await UserEntity.count({
      where: condition,
    });
    const data = await UserEntity.findAll({
      where: condition,
      order: sort as Order,
      offset: ((page ?? 1) - 1) * (pageSize ?? 1000),
      limit: pageSize ?? 1000,
    });

    return {
      total,
      data,
    };
  };

  public static getById = async (id: number): Promise<IUserOutput | null> => {
    return await UserEntity.findByPk(id, {});
  };

  public static getByEmail = async (
    email: string,
    paranoid: boolean = true
  ): Promise<IUserOutput | null> => {
    return await UserEntity.findOne({
      where: { email },
      paranoid: paranoid,
    });
  };

  public static create = async (payload: IUserInput): Promise<IUserOutput> => {
    const existed = await this.getByEmail(payload.email, false);
    if (existed) {
      throw new Error("Email already existed. Please try again!");
    }
    return await UserEntity.create(payload);
  };

  public static destroy = async (id: number): Promise<boolean> => {
    const deleted = await UserEntity.destroy({ where: { id } });
    return !!deleted;
  };

  public static update = async (
    id: number,
    payload: IUserInput
  ): Promise<IUserOutput> => {
    const user = await UserEntity.findByPk(id);
    if (!user) {
      throw new Error("This user doesn't exist!");
    }
    const existed = await UserEntity.findOne({
      where: {
        email: payload.email,
        id: {
          [Op.not]: id,
        },
      },
    });
    if (existed) {
      throw new Error("Email already existed. Please try again!");
    }
    return await user.update(payload);
  };
}

export default UserEntityService;
