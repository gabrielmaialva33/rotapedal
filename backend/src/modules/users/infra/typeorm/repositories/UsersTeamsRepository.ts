import { getRepository, Repository } from 'typeorm';

import IUsersTeamsRepository from '@modules/users/repositories/IUsersTeamsRepository';
import ICreateUserTeamDTO from '@modules/users/dtos/ICreateUserTeamDTO';
import UserTeam from '../entities/UserTeam';

class UsersTeamsRepository implements IUsersTeamsRepository {
  private ormRepository: Repository<UserTeam>;

  constructor() {
    this.ormRepository = getRepository(UserTeam);
  }

  public async addUserTeam({
    user_id,
    team_id,
  }: ICreateUserTeamDTO): Promise<UserTeam> {
    const userTeam = this.ormRepository.create({ user_id, team_id });
    await this.ormRepository.save(userTeam);

    return userTeam;
  }

  public async removeUserTeam(userTeam: UserTeam): Promise<UserTeam> {
    return this.ormRepository.remove(userTeam);
  }

  public async findUserTeam({
    user_id,
    team_id,
  }: ICreateUserTeamDTO): Promise<UserTeam | undefined> {
    const userTeam = await this.ormRepository.findOne({
      where: { user_id, team_id },
    });

    return userTeam;
  }

  public async listTeamsUser(user_id: string): Promise<UserTeam[]> {
    const teams = await this.ormRepository
      .createQueryBuilder('users_teams')
      .select([
        'users_teams.id',
        'team.id',
        'team.name',
        'team.owner',
        'team.description',
        'userTeam.id',
        'user.id',
        'user.name',
        'user.email',
        'user.avatar',
      ])
      .where({ user_id })
      .leftJoin('users_teams.team', 'team')
      .leftJoin('team.userTeam', 'userTeam')
      .leftJoin('userTeam.user', 'user')
      .getMany();

    return teams;
  }
}

export default UsersTeamsRepository;
