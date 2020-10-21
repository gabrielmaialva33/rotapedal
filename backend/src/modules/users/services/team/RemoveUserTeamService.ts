import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import UserTeam from '@modules/users/infra/typeorm/entities/UserTeam';
import IUsersTeamsRepository from '@modules/users/repositories/IUsersTeamsRepository';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  email: string;
  team_id: string;
  user_id: string;
}

@injectable()
class RemoveUserTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('UsersTeamsRepository')
    private usersTeamsRepositorty: IUsersTeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    email,
    team_id,
    user_id,
  }: IRequest): Promise<UserTeam> {
    const checkEmailExists = await this.usersRepository.findByEmail(email);
    if (!checkEmailExists) {
      throw new AppError('Email not found', 404);
    }

    const team = await this.teamsRepository.findTeamById(team_id);
    if (!team) {
      throw new AppError('Team not found', 404);
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not foud', 404);
    }

    if (team.owner !== user.id) {
      throw new AppError('User does not own the team', 401);
    }

    const userTeam = await this.usersTeamsRepositorty.findUserTeam({
      user_id: checkEmailExists.id,
      team_id: team.id,
    });
    if (!userTeam) {
      throw new AppError('User not found on team', 404);
    }

    if (checkEmailExists.id === team.owner) {
      throw new AppError('The team owner cannot remove himself', 401);
    }

    return this.usersTeamsRepositorty.removeUserTeam(userTeam);
  }
}

export default RemoveUserTeamService;
