import { injectable, inject } from 'tsyringe';

import IUsersTeamsRepository from '@modules/users/repositories/IUsersTeamsRepository';
import UserTeam from '@modules/users/infra/typeorm/entities/UserTeam';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowUserTeamService {
  constructor(
    @inject('UsersTeamsRepository')
    private usersTeamsRepository: IUsersTeamsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<UserTeam[]> {
    const checkUserExist = await this.usersRepository.findById(user_id);
    if (!checkUserExist) {
      throw new AppError('User not found', 404);
    }

    const userTeams = await this.usersTeamsRepository.listTeamsUser(user_id);

    return userTeams;
  }
}

export default ShowUserTeamService;
