import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfilesReposirory from '@modules/users/repositories/IProfilesRepository';
import Profile from '@modules/users/infra/typeorm/entities/Profile';

interface IRequest {
  user_id: string;
  nickname: string;
  birthdate: Date;
  phone: string;
  bio: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesReposirory,
  ) {}

  public async execute({
    user_id,
    nickname,
    birthdate,
    phone,
    bio,
  }: IRequest): Promise<Profile> {
    const profile = await this.profilesRepository.findProfileUserById(user_id);

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    profile.nickname = nickname;
    profile.birthdate = birthdate;
    profile.phone = phone;
    profile.bio = bio;

    await this.profilesRepository.save(profile);

    return profile;
  }
}

export default UpdateProfileService;
