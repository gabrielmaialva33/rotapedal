import Bike from '@modules/users/infra/typeorm/entities/Bike';
import ICreateBikeDTO from '@modules/users/dtos/ICreateBikeDTO';

export default interface IBikesRepository {
  create(data: ICreateBikeDTO): Promise<Bike>;
  save(bike: Bike): Promise<Bike>;
  destroy(bike: Bike): Promise<Bike>;
  findBikeByUserId(bike_id: string, user_id: string): Promise<Bike | undefined>;
  findBikeByNickname(
    nickname: string,
    user_id: string,
  ): Promise<Bike | undefined>;
  listAllUserBikes(user_id: string): Promise<Bike[]>;
}
