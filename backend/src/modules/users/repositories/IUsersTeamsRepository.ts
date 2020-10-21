import UserTeam from '@modules/users/infra/typeorm/entities/UserTeam';
import ICreateUserTeamDTO from '../dtos/ICreateUserTeamDTO';

export default interface IUsersTeamsRepository {
  addUserTeam({ user_id, team_id }: ICreateUserTeamDTO): Promise<UserTeam>;
  removeUserTeam(userTeam: UserTeam): Promise<UserTeam>;
  findUserTeam({
    user_id,
    team_id,
  }: ICreateUserTeamDTO): Promise<UserTeam | undefined>;
  listTeamsUser(user_id: string): Promise<UserTeam[]>;
}
