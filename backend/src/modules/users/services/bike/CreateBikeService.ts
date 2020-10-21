import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Bike from '@modules/users/infra/typeorm/entities/Bike';
import IBikesRepository from '@modules/users/repositories/IBikesRepository';

interface IRequest {
  user_id: string;
  nickname: string;
  model: string;
  manufacturing_date: Date;
}

@injectable()
class CreateBikeService {
  constructor(
    @inject('BikesRepository')
    private bikesRepository: IBikesRepository,
  ) {}

  public async excute({
    user_id,
    nickname,
    model,
    manufacturing_date,
  }: IRequest): Promise<Bike> {
    const checkNicknameExists = await this.bikesRepository.findBikeByNickname(
      nickname,
      user_id,
    );
    if (checkNicknameExists) {
      throw new AppError('Bike already exists', 409);
    }

    const bike = this.bikesRepository.create({
      user_id,
      nickname,
      model,
      manufacturing_date,
    });

    return bike;
  }
}

export default CreateBikeService;
