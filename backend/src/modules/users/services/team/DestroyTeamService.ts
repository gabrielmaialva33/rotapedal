import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Team from '@modules/users/infra/typeorm/entities/Team';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DestroyTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(team_id: string, user_id: string): Promise<Team> {
    const checkUserIdExists = await this.usersRepository.findById(user_id);
    if (!checkUserIdExists) {
      throw new AppError('User not found', 404);
    }

    const team = await this.teamsRepository.findTeamById(team_id);

    if (!team) {
      throw new AppError('Team not found', 404);
    }

    if (team.owner !== user_id) {
      throw new AppError('User does not own the team', 401);
    }

    return this.teamsRepository.destroy(team);
  }
}

export default DestroyTeamService;
