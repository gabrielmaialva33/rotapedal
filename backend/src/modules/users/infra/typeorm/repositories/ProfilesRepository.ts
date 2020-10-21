import { getRepository, Repository } from 'typeorm';

import IProfilesRepository from '@modules/users/repositories/IProfilesRepository';
import ICreateProfileDTO from '@modules/users/dtos/ICreateProfileDTO';
import Profile from '@modules/users/infra/typeorm/entities/Profile';

class ProfilesRepository implements IProfilesRepository {
  private ormRepository: Repository<Profile>;

  constructor() {
    this.ormRepository = getRepository(Profile);
  }

  public async create({
    user_id,
    nickname,
    birthdate,
    phone,
    bio,
  }: ICreateProfileDTO): Promise<Profile> {
    const profile = this.ormRepository.create({
      user_id,
      nickname,
      birthdate,
      phone,
      bio,
    });
    await this.ormRepository.save(profile);

    return profile;
  }

  public async save(profile: Profile): Promise<Profile> {
    return this.ormRepository.save(profile);
  }

  public async findProfileUserById(
    user_id: string,
  ): Promise<Profile | undefined> {
    const profile = this.ormRepository
      .createQueryBuilder('profiles')
      .select([
        'profiles.id',
        'profiles.nickname',
        'profiles.birthdate',
        'profiles.phone',
        'profiles.bio',
        'user.id',
        'user.name',
        'user.email',
        'user.avatar',
      ])
      .where({ user_id })
      .leftJoin('profiles.user', 'user')
      .getOne();

    return profile;
  }
}

export default ProfilesRepository;
