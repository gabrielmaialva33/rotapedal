import { injectable, inject } from 'tsyringe';

import ISupportersRepository from '@modules/supporters/repositories/ISupportersRepository';
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';
import Supporter from '@modules/supporters/infra/typeorm/entities/Supporter';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  supporter_id: string;
  logoFilename: string;
}

@injectable()
class UpdateLogoService {
  constructor(
    @inject('SupportersRepository')
    private supportersRepository: ISupportersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    supporter_id,
    logoFilename,
  }: IRequest): Promise<Supporter> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found', 401);
    }
    if (!(user.role === ('supporter' || 'admin'))) {
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

    //* update logo
    if (supporter.logo != null) {
      await this.storageProvider.deleteFile(supporter.logo);
    }

    const filename = await this.storageProvider.saveFile(logoFilename);

    supporter.logo = filename;

    await this.supportersRepository.save(supporter);
    return supporter;
  }
}

export default UpdateLogoService;
