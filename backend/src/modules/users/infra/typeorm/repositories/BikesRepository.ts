import { getRepository, Repository } from 'typeorm';

import IBikesRepository from '@modules/users/repositories/IBikesRepository';
import ICreateBikeDTO from '@modules/users/dtos/ICreateBikeDTO';
import Bike from '@modules/users/infra/typeorm/entities/Bike';

class BikesRepository implements IBikesRepository {
  private ormRepository: Repository<Bike>;

  constructor() {
    this.ormRepository = getRepository(Bike);
  }

  public async create({
    user_id,
    nickname,
    model,
    manufacturing_date,
  }: ICreateBikeDTO): Promise<Bike> {
    const bike = this.ormRepository.create({
      user_id,
      nickname,
      model,
      manufacturing_date,
    });
    await this.ormRepository.save(bike);

    return bike;
  }

  public async save(bike: Bike): Promise<Bike> {
    return this.ormRepository.save(bike);
  }

  public async destroy(bike: Bike): Promise<Bike> {
    return this.ormRepository.remove(bike);
  }

  public async findBikeByUserId(
    bike_id: string,
    user_id: string,
  ): Promise<Bike | undefined> {
    const bike = await this.ormRepository.findOne({
      where: { id: bike_id, user_id },
    });
    return bike;
  }

  public async findBikeByNickname(
    nickname: string,
    user_id: string,
  ): Promise<Bike | undefined> {
    const bike = await this.ormRepository.findOne({
      where: { nickname, user_id },
    });
    return bike;
  }

  public async listAllUserBikes(user_id: string): Promise<Bike[]> {
    const bikes = await this.ormRepository
      .createQueryBuilder('bikes')
      .select([
        'bikes.id',
        'bikes.user_id',
        'bikes.nickname',
        'bikes.model',
        'bikes.manufacturing_date',
      ])
      .where({ user_id })
      .getMany();
    // const bikes = await this.ormRepository.find({ where: { user_id } });
    return bikes;
  }
}

export default BikesRepository;
