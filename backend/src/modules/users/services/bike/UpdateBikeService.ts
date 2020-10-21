import { injectable, inject } from 'tsyringe';

import IBikesRepository from '@modules/users/repositories/IBikesRepository';
import Bike from '@modules/users/infra/typeorm/entities/Bike';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  bike_id: string;
  nickname: string;
  model: string;
  manufacturing_date: Date;
}

@injectable()
class UpdateBikeService {
  constructor(
    @inject('BikesRepository')
    private bikesRepository: IBikesRepository,
  ) {}

  public async execute({
    user_id,
    bike_id,
    nickname,
    model,
    manufacturing_date,
  }: IRequest): Promise<Bike> {
    const bike = await this.bikesRepository.findBikeByUserId(bike_id, user_id);
    if (!bike) {
      throw new AppError('Bike not found', 404);
    }

    bike.nickname = nickname;
    bike.model = model;
    bike.manufacturing_date = manufacturing_date;

    await this.bikesRepository.save(bike);

    return bike;
  }
}

export default UpdateBikeService;
