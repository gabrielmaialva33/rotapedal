import { injectable, inject } from 'tsyringe';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import Supporter from '@modules/supporters/infra/typeorm/entities/Supporter';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowSupporterService {
  constructor(
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,
  ) {}

  public async execute(supporter_id: string): Promise<Supporter> {
    const supporter = await this.supportersRepository.findSupporterById(
      supporter_id,
    );
    if (!supporter) {
      throw new AppError('Supporter not found', 404);
    }

    return supporter;
  }
}

export default ShowSupporterService;
