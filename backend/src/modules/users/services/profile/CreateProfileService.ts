import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfilesRepository from '@modules/users/repositories/IProfilesRepository';
import Profile from '@modules/users/infra/typeorm/entities/Profile';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  nickname: string;
  birthdate: Date;
  phone: string;
  bio: string;
}

@injectable()
class CreateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    nickname,
    birthdate,
    phone,
    bio,
  }: IRequest): Promise<Profile> {
    const checkProfileExists = await this.profilesRepository.findProfileUserById(
      user_id,
    );
    if (checkProfileExists) {
      throw new AppError('Profile user already exists', 409);
    }

    const checkUserIdExists = await this.usersRepository.findById(user_id);
    if (!checkUserIdExists) {
      throw new AppError('User not found', 404);
    }

    const profile = this.profilesRepository.create({
      user_id,
      nickname,
      birthdate,
      phone,
      bio,
    });

    return profile;
  }
}

export default CreateProfileService;
