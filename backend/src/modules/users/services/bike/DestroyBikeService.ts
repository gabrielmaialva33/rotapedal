import { injectable, inject } from 'tsyringe';

import IBikesRepository from '@modules/users/repositories/IBikesRepository';
import Bike from '@modules/users/infra/typeorm/entities/Bike';
import AppError from '@shared/errors/AppError';

@injectable()
class DestroyBikeService {
  constructor(
    @inject('BikesRepository')
    private bikesRepository: IBikesRepository,
  ) {}

  public async execute(bike_id: string, user_id: string): Promise<Bike> {
    const bike = await this.bikesRepository.findBikeByUserId(bike_id, user_id);
    if (!bike) {
      throw new AppError('Bike not found', 404);
    }

    return this.bikesRepository.destroy(bike);
  }
}

export default DestroyBikeService;
