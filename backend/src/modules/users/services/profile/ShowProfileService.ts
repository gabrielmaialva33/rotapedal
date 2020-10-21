import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProfilesReposirory from '@modules/users/repositories/IProfilesRepository';
import Profile from '@modules/users/infra/typeorm/entities/Profile';

@injectable()
class ShowProfileService {
  constructor(
    @inject('ProfilesRepository')
    private profilesRepository: IProfilesReposirory,
  ) {}

  public async execute(user_id: string): Promise<Profile> {
    const profile = await this.profilesRepository.findProfileUserById(user_id);

    if (!profile) {
      throw new AppError('Profile not found', 404);
    }

    return profile;
  }
}

export default ShowProfileService;
