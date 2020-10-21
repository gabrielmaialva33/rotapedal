import { injectable, inject } from 'tsyringe';

import IBikesRepository from '@modules/users/repositories/IBikesRepository';
import Bike from '@modules/users/infra/typeorm/entities/Bike';

@injectable()
class ShowBikeService {
  constructor(
    @inject('BikesRepository')
    private bikesRepository: IBikesRepository,
  ) {}

  public async execute(user_id: string): Promise<Bike[]> {
    const bikes = await this.bikesRepository.listAllUserBikes(user_id);
    return bikes;
  }
}

export default ShowBikeService;
