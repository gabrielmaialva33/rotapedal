import Team from '@modules/users/infra/typeorm/entities/Team';
import ICreateTeamDTO from '@modules/users/dtos/ICreateTeamDTO';

export default interface ITeamsRepository {
  findTeamByName(name: string): Promise<Team | undefined>;
  findTeamById(id: string): Promise<Team | undefined>;
  show(user_id: string): Promise<Team[]>;
  create(data: ICreateTeamDTO): Promise<Team>;
  save(team: Team): Promise<Team>;
  destroy(team: Team): Promise<Team>;
}
