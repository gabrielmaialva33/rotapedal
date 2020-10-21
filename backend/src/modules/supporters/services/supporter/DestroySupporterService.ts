import { injectable, inject } from 'tsyringe';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import Supporter from '@modules/supporters/infra/typeorm/entities/Supporter';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DestroySupporterService {
  constructor(
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(
    user_id: string,
    supporter_id: string,
  ): Promise<Supporter> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (!(user.role === 'admin' || user.role === 'supporter')) {
      throw new AppError('User not permitted', 401);
    }

    const supporter = await this.supportersRepository.findSupporterById(
      supporter_id,
    );
    if (!supporter) {
      throw new AppError('Supporter not found', 404);
    }
    if (user_id !== supporter.user_id) {
      throw new AppError('User not owner');
    }

    await this.supportersRepository.destroy(supporter);
    return supporter;
  }
}

export default DestroySupporterService;
