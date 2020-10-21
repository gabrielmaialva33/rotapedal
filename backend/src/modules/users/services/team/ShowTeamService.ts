import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Team from '@modules/users/infra/typeorm/entities/Team';
import ITeamsRepository from '@modules/users/repositories/ITeamsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ShowTeamService {
  constructor(
    @inject('TeamsRepository')
    private teamsRepository: ITeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<Team[]> {
    const checkUserIdExists = await this.usersRepository.findById(user_id);
    if (!checkUserIdExists) {
      throw new AppError('User not found', 404);
    }

    const team = await this.teamsRepository.show(user_id);

    return team;
  }
}

export default ShowTeamService;
