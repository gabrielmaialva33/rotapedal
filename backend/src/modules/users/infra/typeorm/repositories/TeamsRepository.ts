import { Repository, getRepository } from 'typeorm';

import Team from '@modules/users/infra/typeorm/entities/Team';
import UserTeam from '@modules/users/infra/typeorm/entities/UserTeam';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import ICreateTeamDTO from '@modules/users/dtos/ICreateTeamDTO';

class TeamsRepository implements ITeamsRepository {
  private ormRepositoryTeam: Repository<Team>;

  private ormRepositoryUsersTeams: Repository<UserTeam>;

  constructor() {
    this.ormRepositoryTeam = getRepository(Team);
    this.ormRepositoryUsersTeams = getRepository(UserTeam);
  }

  public async create({
    owner,
    name,
    description,
  }: ICreateTeamDTO): Promise<Team> {
    const team = this.ormRepositoryTeam.create({ owner, name, description });
    const { id } = await this.ormRepositoryTeam.save(team);
    const userTeam = this.ormRepositoryUsersTeams.create({
      user_id: owner,
      team_id: id,
    });
    await this.ormRepositoryUsersTeams.save(userTeam);
    return team;
  }

  public async save(team: Team): Promise<Team> {
    return this.ormRepositoryTeam.save(team);
  }

  public async destroy(team: Team): Promise<Team> {
    return this.ormRepositoryTeam.remove(team);
  }

  public async show(user_id: string): Promise<Team[]> {
    const team = this.ormRepositoryTeam
      .createQueryBuilder('teams')
      .select([
        'teams.id',
        'teams.owner',
        'teams.name',
        'teams.description',
        'userTeam.user_id',
        'user.name',
        'user.email',
        'user.avatar',
      ])
      .where({ owner: user_id })
      .leftJoin('teams.userTeam', 'userTeam')
      .leftJoin('userTeam.user', 'user')
      .getMany();

    return team;
  }

  public async findTeamByName(name: string): Promise<Team | undefined> {
    const team = this.ormRepositoryTeam.findOne({ where: { name } });
    return team;
  }

  public async findTeamById(id: string): Promise<Team | undefined> {
    const team = this.ormRepositoryTeam.findOne({ where: { id } });
    return team;
  }
}

export default TeamsRepository;
