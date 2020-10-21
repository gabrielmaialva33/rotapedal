import Profile from '@modules/users/infra/typeorm/entities/Profile';
import ICreateProfileDTO from '@modules/users/dtos/ICreateProfileDTO';

export default interface IProfilesRepository {
  findProfileUserById(user_id: string): Promise<Profile | undefined>;
  create(data: ICreateProfileDTO): Promise<Profile>;
  save(profile: Profile): Promise<Profile>;
}
